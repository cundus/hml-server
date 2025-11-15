const { request } = require("express");

module.exports = {
  testingModel: require("./testing.model"),
  BusinessClusterModel: require("./v1/BusinessCluster.model"),
  FeatureConfigModel: require("./v1/FeatureConfig.model"),
  PaymentConfigModel: require("./v1/PaymentConfig.model"),
  ThirdPartyConfigModel: require("./v1/ThirdPartyConfig.model"),
  ControlReportConfigModel: require("./v1/ControlReportConfig.model"),
  TimeConfigModel: require("./v1/TimeConfig.model"),
  ResolutionConfigModel: require("./v1/ResolutionConfig.model"),
  SettlementConfigModel: require("./v1/SettlementConfig.model"),
  MonitoringJobModel: require("./v1/MonitoringJob.model"),
  ReconReportModel: require("./v1/ReconReport.model"),
  ResolutionModel: require("./v1/Resolution.model"),
  PushNotifBrimoOpsorBHmodel: require("./v1/pushnotifbrimo/PushNotifBrimo.OpsorBH.model"),
  PushNotifBrimoOpsorGRmodel: require("./v1/pushnotifbrimo/PushNotifBrimo.OpsorGR.model"),
  ReportConfigModel: require("./v1/ReportConfig.model"),
  RefDropdownModel: require("./v1/RefDropdown.model"),
  MinioModel: require("./v1/Minio.model"),
  ResolutionAutomationModel: require("./v1/ResolutionAutomation.model"),
  SlaReportModel: require("./v1/SlaReport.model"),
  QueueExportModel: require("./v1/QueueExport.model"),
};
