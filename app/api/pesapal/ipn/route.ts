import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderTrackingId = searchParams.get("OrderTrackingId");
  const orderMerchantReference = searchParams.get("OrderMerchantReference");
  const orderNotificationType = searchParams.get("OrderNotificationType");

  console.log("IPN Notification received:", {
    orderTrackingId,
    orderMerchantReference,
    orderNotificationType,
  });

  return NextResponse.json({ success: true });
}
