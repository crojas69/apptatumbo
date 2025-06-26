function adaptSiteSurvey(local: any) {
    return {
      siteName: local.siteName,
      address: local.address,
      topographicConditions: local.topographicConditions,
      topographyPhoto: local.topographyPhoto,
      infrastructure: local.infrastructure,
      infrastructurePhoto: local.infrastructurePhoto,
      rfNoise: local.rfNoise,
      rfSnr: local.rfSnr,
      rfSurveyPhoto: local.rfSurveyPhoto,
      cableLastMile: local.cableLastMile,
      cablePhoto: local.cablePhoto,
      headendLocation: local.headendLocation,
      headendPhoto: local.headendPhoto,
      homesLocation: local.homesLocation,
      homesPhoto: local.homesPhoto,
      signature: local.signature,
    };
  }
  
  function adaptVisitApproval(local: any) {
    return {
      siteName: local.siteName,
      visitDate: local.visitDate,
      rssi: local.rssi,
      coveragePhoto: local.coveragePhoto,
      connectivityResults: local.connectivityResults,
      connectivityPhoto: local.connectivityPhoto,
      devicesTested: local.devicesTested,
      devicesPhoto: local.devicesPhoto,
      webAccessResults: local.webAccessResults,
      webAccessPhoto: local.webAccessPhoto,
      equipmentFunctionality: local.equipmentFunctionality,
      equipmentPhoto: local.equipmentPhoto,
      equipmentList: local.equipmentList,
      equipmentListPhoto: local.equipmentListPhoto,
      conclusion: local.conclusion,
      signature: local.signature,
    };
  }
  