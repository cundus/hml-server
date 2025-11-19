const express = require("express");
const config = require("../../config/config");

const router = express.Router();
const { authenticate } = require("../../middlewares/Auth.middleware");


const routeConfigs = [
  ["auth", "Auth"],
  ["store", "Store"],
  ["user", "User"],
  // ["thirdparty-config", "ThirdPartyConfig"],
  // ["control-report-config", "ControlReportConfig"],
  // ["time-config", "TimeConfig"],
  // ["resolution-config", "ResolutionConfig"],
  // ["settlement-config", "SettlementConfig"],
  // ["monitoring-job", "MonitoringJob"],
  // ["recon-report", "ReconReport"],
  // ["resolution", "Resolution"],
  // ["inquiry/status-recon", "InquiryStatusRecon"],
  // ["minio-report", "Minio"],
  // ["report-config", "ReportConfig"],
  // ["ref-dropdown", "RefDropdown"],
  // ["resolution-automation", "ResolutionAutomation"],
  // ["sla-report", "SlaReport"],
  // ["queue-export", "QueueExport"],
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
    router.use(route.path, authenticate, route.route);
  });
} else {
  routes.forEach((route) => {
    if (route.name != "testing") {
      router.use(route.path, route.route);
    }
  });
}

module.exports = router;
