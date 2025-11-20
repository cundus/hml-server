const express = require("express");

const router = express.Router();
const { authenticate } = require("../../middlewares/Auth.middleware");
const config = require("../../config/config");


const routeConfigs = [
  ["auth", "Auth"],
  ["store", "Store"],
  ["user", "User"],
  ["audit_log", "AuditLog"],
  ["batch", "Batch"],
  ["category", "Category"],
  ["customer", "Customer"],
  ["customer_category", "CustomerCategory"],
  ["permission", "Permission"],
  ["product", "Product"],
  ["product_location", "ProductLocation"],
  ["product_price", "ProductPrice"],
  ["purchase_order", "PurchaseOrder"],
  ["purchase_order_item", "PurchaseOrderItem"],
  ["role", "Role"],
  ["role_permission", "RolePermission"],
  ["stock_adjustment", "StockAdjustment"],
  ["stock_transaction", "StockTransaction"],
  ["supplier", "Supplier"],
  ["transaction_items", "TransactionItems"],
  ["transactions", "Transactions"],
  ["transfer_item", "TransferItem"],
  ["transfer_request", "TransferRequest"],
  ["user_role", "UserRole"]

];


const routes = routeConfigs.map(([path, fileName]) => ({
  name: path,
  path: `/${path}`,
  route: require(`./${fileName}.route`),
}));

if (config.env === "development") {
  routes.forEach((route) => {
    if (route.name === "auth") {
      router.use(route.path, route.route);
      return;
    }
    // router.use(route.path, authenticate, route.route);
    router.use(route.path, route.route);
  });
} else {
  routes.forEach((route) => {
    if (route.name != "testing") {
      router.use(route.path, route.route);
    }
  });
}

module.exports = router;
