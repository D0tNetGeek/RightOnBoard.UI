import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<string>("app.config");

export interface IAppConfig {
    apiEndPoint: string;
    apiSettingsPath: string;
    apiRegistrationPath: string;
    apiUserServicePath: string;

    apiSurveyEndPoint: string;

    apiHealthCheckPath: string;
    apiQuestionnairePath: string;
    apiSurveyForIterationPath: string;

    apiSurveyForAdminPath: string;
    apiGetSurveysForAdminPath: string;

    apiCompanyPath: string;
    apiGetCompanyInfoPath: string;
}

export const AppConfig: IAppConfig = {
    apiEndPoint: "http://localhost:64278/api",
    apiSettingsPath: "ApiSettings",
    apiRegistrationPath: "accounts",
    apiUserServicePath: "user",

    apiSurveyEndPoint: "http://localhost:59153/api",

    apiHealthCheckPath: "healthcheck",
    apiQuestionnairePath: "questionnaire",
    apiSurveyForIterationPath: "getsurveyforiteration",

    apiSurveyForAdminPath: "survey",
    apiGetSurveysForAdminPath: "getSurveysListForAdmin",

    apiCompanyPath: "company",
    apiGetCompanyInfoPath: "getCompanyInfo"
}