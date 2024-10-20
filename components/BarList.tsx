import { cx } from "@/lib/utils";
import React from "react";

type Bar<T> = T & {
  key?: string;
  href?: string;
  value: number;
  name: string;
};

interface BarListProps<T = unknown>
  extends React.HTMLAttributes<HTMLDivElement> {
  data: Bar<T>[];
  valueFormatter?: (value: number) => string;
  sortOrder?: "ascending" | "descending" | "none";
}

function BarListInner<T>(
  {
    data = [],
    valueFormatter = (value) => value.toString(),
    sortOrder = "descending",
    className,
    ...props
  }: BarListProps<T>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const sortedData = React.useMemo(() => {
    if (sortOrder === "none") {
      return data;
    }
    return [...data].sort((a, b) => {
      return sortOrder === "ascending" ? a.value - b.value : b.value - a.value;
    });
  }, [data, sortOrder]);

  const widths = React.useMemo(() => {
    const maxValue = Math.max(...sortedData.map((item) => item.value), 0);
    return sortedData.map((item) =>
      item.value === 0 ? 0 : Math.max((item.value / maxValue) * 100, 2)
    );
  }, [sortedData]);

  const rowHeight = "h-8";

  return (
    <div
      ref={forwardedRef}
      className={cx("flex justify-between space-x-6", className)}
      aria-sort={sortOrder}
      tremor-id="tremor-raw"
      {...props}
    >
      <div className="relative w-full space-y-1.5">
        {sortedData.map((item, index) => (
          <div
            key={item.key ?? item.name}
            className={cx("group w-full rounded")}
          >
            <div
              className={cx(
                "flex items-center rounded transition-all",
                rowHeight,
                "bg-pink-200 dark:bg-pink-600",

                {
                  "mb-0": index === sortedData.length - 1,
                }
              )}
              style={{ width: `${widths[index]}%` }}
            >
              <div className={cx("absolute left-2 flex max-w-full pr-2")}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={cx(
                      // base
                      "truncate whitespace-nowrap rounded text-sm",

                      "text-gray-600 dark:text-gray-50",

                      "hover:underline hover:underline-offset-2"
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <p
                    className={cx(
                      "truncate whitespace-nowrap text-sm",
                      "text-gray-600 dark:text-gray-50"
                    )}
                  >
                    {item.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {sortedData.map((item, index) => (
          <div
            key={item.key ?? item.name}
            className={cx(
              "flex items-center justify-end",
              rowHeight,
              index === sortedData.length - 1 ? "mb-0" : "mb-1.5"
            )}
          >
            <p
              className={cx(
                // base
                "truncate whitespace-nowrap text-sm leading-none",
                // text color
                "text-gray-600 dark:text-gray-50"
              )}
            >
              {valueFormatter(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

BarListInner.displayName = "BarList";

const BarList = React.forwardRef(BarListInner) as <T>(
  p: BarListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof BarListInner>;

export { BarList, type BarListProps };
