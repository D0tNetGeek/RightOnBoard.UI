import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<string>("app.config");

export interface IAppConfig {
    apiEndPoint: string;
    apiSettingsPath: string;
    apiRegistrationPath: string;
    apiUserServicePath: string;
    apiGetRolesForAdminPath: string;
    apiCreateUserByAdminPath: string;

    apiGetRegistrationOptionsPath: string;

    apiSurveyEndPoint: string;

    apiHealthCheckPath: string;
    apiQuestionnairePath: string;
    apiSurveyForIterationPath: string;

    apiSurveyForAdminPath: string;
    apiGetSurveysForAdminPath: string;
    apiCreateSurveyForAdminPath: string;

    apiIterationForAdminPath: string;
    apiCreateSurveyIterationForAdminPath: string;

    apiQuestionGroupForAdminPath: string;
    apiCreateQuestionGroupForAdminPath: string;
    apiGetQuestionGroupForSurveyPath: string;

    apiDriversForAdminPath: string;
    apiCreateDriversForAdminPath: string;

    apiCompanyPath: string;
    apiGetCompaniesListForAdmin: string;
    apiGetCompanyInfoPath: string;
    apiGetCompanyInfoByCompanyIdPath: string;
    apiSaveCompanyInfoPath: string;
    apiCreateCompanyPath: string;
}

export const AppConfig: IAppConfig = {
    apiEndPoint: "http://localhost:64278/api",
    apiSettingsPath: "ApiSettings",
    apiRegistrationPath: "accounts",
    apiUserServicePath: "user",

    apiGetRolesForAdminPath: "getrolesforadmin",
    apiCreateUserByAdminPath: "createuserbyadmin",
    
    apiGetRegistrationOptionsPath: "getregistrationoptions",

    apiSurveyEndPoint: "http://localhost:59153/api",

    apiHealthCheckPath: "healthcheck",
    apiQuestionnairePath: "questionnaire",
    apiSurveyForIterationPath: "getsurveyforiteration",

    apiSurveyForAdminPath: "survey",
    apiGetSurveysForAdminPath: "getSurveysListForAdmin",
    apiCreateSurveyForAdminPath: "createSurvey",

    apiIterationForAdminPath: "iteration",
    apiCreateSurveyIterationForAdminPath: "createIteration",

    apiQuestionGroupForAdminPath: "questiongroup",
    apiCreateQuestionGroupForAdminPath: "createQuestionGroup",
    apiGetQuestionGroupForSurveyPath: "getquestiongroupsforsurvey",

    apiDriversForAdminPath: "driver",
    apiCreateDriversForAdminPath: "createDrivers",

    apiCompanyPath: "company",
    apiGetCompaniesListForAdmin: "getcompanieslistforadmin",
    apiGetCompanyInfoPath: "getcompanyinfo",
    apiGetCompanyInfoByCompanyIdPath: "getcompanyinfobycompanyid",
    apiSaveCompanyInfoPath: "savecompanyinfo",
    apiCreateCompanyPath: "createCompany"
}