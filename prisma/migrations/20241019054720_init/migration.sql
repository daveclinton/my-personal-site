-- CreateTable
CREATE TABLE "Analytics" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "slug" TEXT NOT NULL,
    "referrer" TEXT,
    "flag" TEXT,
    "country" TEXT,
    "city" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);
