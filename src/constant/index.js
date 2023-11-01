/* eslint-disable import/prefer-default-export */
import { constants } from '../../libs';

const {
  ATA_REQUEST_INITIAL_PROPOSAL,
  ATA_PUBLISH_INITIAL_PROPOSAL,
  ATA_APPROVE_INITIAL_PROPOSAL,
  ATA_REQUEST_ADD_TRUSTEE,
  ATA_APPROVE_TRUSTEE_LGIM,
  ATA_APPROVE_TRUSTEE_CLIENT,
  ATA_APPROVED_TRUSTEE_LIST,
  ATA_REQUEST_IAA,
  ATA_APPROVE_IAA_KYC,
  ATA_GENERATE_IAA,
  ATA_GENERATE_MANAGER_LETTERS,
  ATA_APPROVE_IAA_LGIM,
  ATA_PUBLISH_IAA,
  ATA_PUBLISH_MANAGER_LETTERS,
  ATA_APPROVE_IAA_CLIENT,
  ATA_SIGN_IAA,
  ATA_REQUEST_AMAO,
  ATA_APPROVE_AMAO,
  ATA_GENERATE_AMAOD,
  ATA_APPROVE_ADVISORY,
  ATA_APPROVE_FMA,
  ATA_APPROVE_PMC,
  ATA_PUBLISH_AMAOD,
  ATA_APPROVE_ADVISORY_CLIENT,
  ATA_APPROVE_PMC_CLIENT,
  ATA_APPROVE_FMA_CLIENT,
  ATA_SIGN_FMA_PMC_EXE,
  ATA_GENERATE_MTL,
  ATA_APPROVE_MTL,
  ATA_PUBLISH_MTL,
  ATA_ACTIVATE_SCHEME,

  ATA_ON_ASSIGN_USER_TO_STEP,
  ATA_ON_UPDATE_USER_CLAIMS,
  ATA_ON_ADD_USER,
  ATA_ON_SAVE_TASKS,
  ATA_ON_CREATE_SCHEME,
  ATA_ON_UPDATE_FAVORITE,
  ATA_ON_REMOVE_FAVORITE,
  ATA_TBAD_ON_APPROVE_BANK_ACCOUNT_DETAILS,
  ATA_TBAD_ON_APPROVE_BANK_DETAILS,
  ATA_TBAD_ON_REQUSET_DATA,
  ATA_TBAD_ON_ACTIVATE_MANDATE,
  ATA_ON_ADD_NEW_COMMENTS,
  ATA_ON_ABORT_WORKFLOW,

  ATA_ON_UPDATE_GROUP,
  ATA_ON_CREATE_GROUP,

  ATA_STEP_ACTION_DATA_CHANGE,
  ATA_STEP_ACTION_UPDATE_WORKFLOW,
  ATA_STEP_ACTION_PROCEED_WORKFLOW,
  ATA_STEP_ACTION_AUTHORIZE,
  ATA_STEP_ACTION_SIGN,

  ATA_FLT_ON_UPDATE,
  ATA_FLT_ON_APPROVAL,
  ATA_FLT_ON_ACTIVATE_MANDATE,

  ATA_RTC_ON_REQUEST_CANCEL_ACCOUNT,
  ATA_RTC_ON_LGIM_PROCESS_REQUEST,
  ATA_RTC_ON_TRUSTEE_APPROVAL,
  ATA_RTC_ON_DEACTIVATE_ACCOUNT,
  ATA_RTC_ON_SCHEDULE_DEACTIVATE_ACCOUNT,

  ATA_TR_ON_GENERATE_TRANSITION_REPORT,
  ATA_TR_ON_APPROVE_TRANSITION_REPORT,
  ATA_TR_ON_PUBLISH_TRANSITION_REPORT,

  ATA_LU_ON_LIABILITY_UPDATE,
  ATA_LU_ON_GENERATE_ADVISORY_REPORT_FMA,
  ATA_LU_ON_APPROVE_ADVISORY_REPORT,
  ATA_LU_ON_APPROVE_FMA,
  ATA_LU_ON_PUBLISH_ADVISORY_REPORT_FMA,
  ATA_LU_ON_SCHEME_APPROVE_ADVISORY,
  ATA_LU_ON_SCHEME_APPROVE_FMA,
  ATA_LU_ON_LGIM_EXECUTION_STATE_CHANGE,
  ATA_LU_ON_ACTIVE_MANDATE,

  ATA_SNC_ON_SCHEME_NAME_CHANGE,
  ATA_SNC_ON_GENERATE_DOCS,
  ATA_SNC_ON_APPROVE_IAA,
  ATA_SNC_ON_APPROVE_FMA,
  ATA_SNC_ON_APPROVE_PMC,
  ATA_SNC_ON_APPROVE_SIP,
  ATA_SNC_ON_PUBLISH_DOCS,
  ATA_SNC_ON_SCHEME_APPROVE_IAA,
  ATA_SNC_ON_SCHEME_APPROVE_FMA,
  ATA_SNC_ON_SCHEME_APPROVE_PMC,
  ATA_SNC_ON_SCHEME_APPROVE_SIP,
  ATA_SNC_ON_SPNSR_CONSULTED,
  ATA_SNC_ON_CLIENT_EXECUTION_STATE_CHANGE,
  ATA_SNC_ON_LGIM_EXECUTION_STATE_CHANGE,
  ATA_SNC_ON_ACTIVE_MANDATE,

  ATA_TC_ON_TRUSTEE_CHANGE,
  ATA_TC_ON_APPROVE_TRUSTEE,
  ATA_TC_ON_APPROVE_LGIM,

  ATA_CFMF_ON_CHANGE_FM_FEE,
  ATA_CFMF_ON_GENERATE_FMA,
  ATA_CFMF_ON_APPROVE_FMA,
  ATA_CFMF_ON_PUBLISH_FMA,
  ATA_CFMF_ON_TRUSTEE_APPROVE_FMA,
  ATA_CFMF_ON_ACTIVATE_MANDATE,

  ATA_CAF_ON_CHANGE_ADVISORY_FEE,
  ATA_CAF_ON_GENERATE_IAA,
  ATA_CAF_ON_APPROVE_IAA,
  ATA_CAF_ON_PUBLISH_IAA,
  ATA_CAF_ON_TRUSTEE_APPROVE_IAA,
  ATA_CAF_ON_ACTIVATE_MANDATE,

  ATA_AR_ON_REQUEST_ADDITIONAL_REPORT,
  ATA_AR_ON_GENERATE_ADDITIONAL_REPORT,
  ATA_AR_ON_APPROVE_SCHEME_ANNUAL_REPORT,
  ATA_AR_ON_APPROVE_COMPANY_ANNUAL_REPORT,
  ATA_AR_ON_APPROVE_TPR_REPORT,
  ATA_AR_ON_PUBLISH_ADDITIONAL_REPORT,
  ATA_AR_ON_SAVE_REPORT_DIRECTORY,

  ATA_DC_ON_DEFICIT_CONTRIBUTION_UPDATE,
  ATA_DC_ON_DEFICIT_CONTRIBUTION_DOWNLOAD,
  ATA_DC_ON_GENERATE_ADVISORY_REPORT,
  ATA_DC_ON_APPROVE_ADVISORY_REPORT,
  ATA_DC_ON_PUBLISH_ADVISORY_REPORT,
  ATA_DC_ON_APPROVE_DEFICIT_CONTRIBUTION,
  ATA_DC_ON_ACTIVE_MANDATE,

  ATA_US_ON_UPLOAD_SIP,
  ATA_US_ON_APPROVE_SIP,
  ATA_US_ON_PUBLISH_SIP,
  ATA_US_ON_SCHEME_APPROVE_SIP,
  ATA_US_ON_SPONSOR_CONSULT,
  ATA_US_ON_ACTIVATE_MANDATE,

  ATA_AVC_ON_UPDATE_AVC_DETAILS,
  ATA_AVC_ON_DOWNLOAD_AVC_DETAILS,
  ATA_AVC_ON_UPLOAD_AVC_DOCS,
  ATA_AVC_ON_APPROVE_AR,
  ATA_AVC_ON_APPROVE_SIP,
  ATA_AVC_ON_PUBLISH_AVC_DOCS,
  ATA_AVC_ON_SCHEME_APPROVE_AR,
  ATA_AVC_ON_SCHEME_APPROVE_SIP,
  ATA_AVC_ON_SPONSOR_CONSULT,
  ATA_AVC_ON_ACTIVATE_MANDATE,

  ATA_FSR_ON_UPDATE_FSR,
  ATA_FSR_ON_DOWNLOAD_FSR,
  ATA_FSR_ON_UPLOAD_FSR_DOCS,
  ATA_FSR_ON_APPROVE_AR,
  ATA_FSR_ON_APPROVE_SIP,
  ATA_FSR_ON_APPROVE_FMA,
  ATA_FSR_ON_PUBLISH_FSR_DOCS,
  ATA_FSR_ON_SCHEME_APPROVE_AR,
  ATA_FSR_ON_SCHEME_APPROVE_SIP,
  ATA_FSR_ON_SCHEME_APPROVE_FMA,
  ATA_FSR_ON_SPONSOR_CONSULT,
  ATA_FSR_ON_LGIM_EXECUTION_STATE_CHANGE,
  ATA_FSR_ON_ACTIVATE_MANDATE,

  ATA_RTU_ON_UPDATE_RTU_DETAILS,
  ATA_RT_ON_DOWNLOAD_DRT,
  ATA_RTU_ON_UPLOAD_RTU_DOCS,
  ATA_RTU_ON_APPROVE_AR,
  ATA_RTU_ON_APPROVE_SIP,
  ATA_RTU_ON_APPROVE_FMA,
  ATA_RTU_ON_PUBLISH_RTU_DOCS,
  ATA_RTU_ON_SCHEME_APPROVE_AR,
  ATA_RTU_ON_SCHEME_APPROVE_SIP,
  ATA_RTU_ON_SCHEME_APPROVE_FMA,
  ATA_RTU_ON_SPONSOR_CONSULT,
  ATA_RTU_ON_LGIM_EXECUTION_STATE_CHANGE,
  ATA_RTU_ON_ACTIVATE_MANDATE,

  ATA_ON_USER_REMOVED_FROM_SCHEME,

  ATA_ON_REJECT_USER_DELETE_REQUEST_LGIM,
  ATA_ON_REJECT_USER_DELETE_REQUEST_CLIENT,
  ATA_ON_USER_ACCOUNT_DELETED,
  ATA_ON_SEND_DELETE_REQUEST,

  ATA_DC_ON_KEY_MATRIX_TABLE,
} = constants;
/**
 * %USER%   name
 * %AR_STATUS%   approve / reject status
 * %STEP%   step key
 * %DOC% document name
 *
 */
export const actions = {
  // registrtion workflow steps
  [ATA_REQUEST_INITIAL_PROPOSAL]: "%USER% requested 'formal proposal'.",
  [ATA_PUBLISH_INITIAL_PROPOSAL]: "%USER% published %UPLOADORGENERATED% 'formal proposal'.",
  [ATA_APPROVE_INITIAL_PROPOSAL]: "%USER% %AR_STATUS% 'formal proposal'.",
  [ATA_REQUEST_ADD_TRUSTEE]: "%USER% requested 'add / change trustees'.",
  [ATA_APPROVE_TRUSTEE_LGIM]: '%USER% %AR_STATUS% trustees.',
  [ATA_APPROVE_TRUSTEE_CLIENT]: '%USER% %AR_STATUS% trustees.',
  [ATA_APPROVED_TRUSTEE_LIST]: '%USER% %AR_STATUS% trustee list.',
  [ATA_REQUEST_IAA]: "%USER% requested 'advisory agreement.'",
  [ATA_APPROVE_IAA_KYC]: "%USER% %AR_STATUS% 'IAA/KYC/AML'.",
  [ATA_GENERATE_IAA]: "%USER% %UPLOADORGENERATED% 'advisory agreement'.",
  [ATA_GENERATE_MANAGER_LETTERS]: "%USER% uploaded 'manager letters'.",
  [ATA_APPROVE_IAA_LGIM]: "%USER% %AR_STATUS% 'advisory agreement'.",
  [ATA_PUBLISH_IAA]: "%USER% published 'advisory agreement'.",
  [ATA_PUBLISH_MANAGER_LETTERS]: "%USER% published 'manager letters'.",
  [ATA_APPROVE_IAA_CLIENT]: "%USER% %AR_STATUS% 'advisory agreement'.",
  [ATA_SIGN_IAA]: "%USER% changed execution status of 'advisory agreement'.",
  [ATA_REQUEST_AMAO]: "%USER% requested 'provide data for investment advice'.",
  [ATA_APPROVE_AMAO]: "%USER% %AR_STATUS% 'asset Management account'.",
  [ATA_GENERATE_AMAOD]: "%USER% %UPLOADORGENERATED% '%DOC%'.",
  [ATA_APPROVE_ADVISORY]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_APPROVE_FMA]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_APPROVE_PMC]: "%USER% %AR_STATUS% 'policy terms'.",
  [ATA_PUBLISH_AMAOD]: "%USER% published '%DOC%'.",
  [ATA_APPROVE_ADVISORY_CLIENT]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_APPROVE_PMC_CLIENT]: "%USER% %AR_STATUS% 'policy terms'.",
  [ATA_APPROVE_FMA_CLIENT]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_SIGN_FMA_PMC_EXE]: '%USER% changed execution status of asset management account documents.',
  [ATA_GENERATE_MTL]: "%USER% %UPLOADORGENERATED% 'manager termination letter(s)'.",
  [ATA_APPROVE_MTL]: "%USER% %AR_STATUS% 'manager termination letter(s)'.",
  [ATA_PUBLISH_MTL]: "%USER% published 'manager termination letter(s)'.",
  [ATA_ACTIVATE_SCHEME]: '%USER% activated scheme.',

  [ATA_ON_ASSIGN_USER_TO_STEP]: "%USER% assigned '%STEP%' to %Assigned_User%.", // added
  [ATA_ON_UPDATE_USER_CLAIMS]: '%USER% updated user group.',
  [ATA_ON_ADD_USER]: '%USER% added %ADDEDUSER% to scheme.', // add  %ADDEDUSER%  to the code - added
  [ATA_ON_SAVE_TASKS]: '%USER% messaged %MESSAGEDUSER%.', // add MESSAGEDUSER to the code - added
  [ATA_ON_CREATE_SCHEME]: '%USER% created scheme.',
  [ATA_ON_UPDATE_FAVORITE]: '%USER% marked scheme as favourite.',
  [ATA_ON_REMOVE_FAVORITE]: '%USER% removed scheme from favourites.',
  [ATA_TBAD_ON_APPROVE_BANK_ACCOUNT_DETAILS]: "%USER% %AR_STATUS% '%STEP%'.",
  [ATA_TBAD_ON_APPROVE_BANK_DETAILS]: "%USER% %AR_STATUS% '%STEP%'.",
  [ATA_TBAD_ON_REQUSET_DATA]: "%USER% submitted '%STEP%'.",
  [ATA_TBAD_ON_ACTIVATE_MANDATE]: "%USER% activated 'change to bank account details'.",
  [ATA_ON_ADD_NEW_COMMENTS]: "%USER% added comment in '%STEP%'.",
  [ATA_ON_ABORT_WORKFLOW]: "%USER% aborted '%WORKFLOW%'.",

  [ATA_ON_UPDATE_GROUP]: '%USER% created %GROUP_NAME%.',
  [ATA_ON_CREATE_GROUP]: '%USER% updated %GROUP_NAME%.',

  [ATA_STEP_ACTION_DATA_CHANGE]: "%USER% update/saved '%STEP%'.",
  [ATA_STEP_ACTION_UPDATE_WORKFLOW]: "%USER% completed '%STEP%'.",
  [ATA_STEP_ACTION_PROCEED_WORKFLOW]: "%USER% completed '%STEP%'.",
  [ATA_STEP_ACTION_AUTHORIZE]: "%USER% %AR_STATUS% '%STEP%'.",
  [ATA_STEP_ACTION_SIGN]: "%USER% confirmed '%DOC%' execution.", // add %DOC% to the code

  // Active workflow - request to cancel
  [ATA_RTC_ON_REQUEST_CANCEL_ACCOUNT]: "%USER% requested 'mandate termination'.",
  [ATA_RTC_ON_LGIM_PROCESS_REQUEST]: "%USER% proceeded 'mandate termination request'.",
  [ATA_RTC_ON_TRUSTEE_APPROVAL]: "%USER% proceeded 'mandate termination request'.",
  [ATA_RTC_ON_DEACTIVATE_ACCOUNT]: '%USER% deactivated the account.',
  [ATA_RTC_ON_SCHEDULE_DEACTIVATE_ACCOUNT]: '%USER% scheduled deactivation of the account.',

  // Active workflow - funding level triggers
  [ATA_FLT_ON_UPDATE]: "%USER% requested 'bespoke funding level trigger changes'.",
  [ATA_FLT_ON_APPROVAL]: "%USER%  %AR_STATUS% 'funding level triggers'.",
  [ATA_FLT_ON_ACTIVATE_MANDATE]: "%USER% activated 'funding level triggers mandate'.",

  // active workflow - Bespoke advice report
  [ATA_TR_ON_GENERATE_TRANSITION_REPORT]: "%USER% %UPLOADORGENERATED% 'bespoke report'.",
  [ATA_TR_ON_APPROVE_TRANSITION_REPORT]: "%USER% %AR_STATUS% 'bespoke report'.",
  [ATA_TR_ON_PUBLISH_TRANSITION_REPORT]: "%USER% published 'bespoke report'.",

  // active workflow - liability update - LU
  [ATA_LU_ON_LIABILITY_UPDATE]: "%USER% requested 'update liability information'.",
  [ATA_LU_ON_GENERATE_ADVISORY_REPORT_FMA]: "%USER% %UPLOADORGENERATED% '%DOC%'.",
  [ATA_LU_ON_APPROVE_ADVISORY_REPORT]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_LU_ON_APPROVE_FMA]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_LU_ON_PUBLISH_ADVISORY_REPORT_FMA]: "%USER% published '%DOC%'.",
  [ATA_LU_ON_SCHEME_APPROVE_ADVISORY]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_LU_ON_SCHEME_APPROVE_FMA]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_LU_ON_LGIM_EXECUTION_STATE_CHANGE]: '%USER% changed execution status of legal document.',
  [ATA_LU_ON_ACTIVE_MANDATE]: "%USER% activated 'update liability information'.",

  // active workflow - scheme name change - SNC
  [ATA_SNC_ON_SCHEME_NAME_CHANGE]: "%USER% requested 'update scheme name'.",
  [ATA_SNC_ON_GENERATE_DOCS]: "%USER% %UPLOADORGENERATED% '%DOC%'.",
  [ATA_SNC_ON_APPROVE_IAA]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_SNC_ON_APPROVE_FMA]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_SNC_ON_APPROVE_PMC]: "%USER% %AR_STATUS% 'policy terms'.",
  [ATA_SNC_ON_APPROVE_SIP]: "%USER% %AR_STATUS% 'statement of investment principles'.",
  [ATA_SNC_ON_PUBLISH_DOCS]: "%USER% published '%DOC%'.",
  [ATA_SNC_ON_SCHEME_APPROVE_IAA]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_SNC_ON_SCHEME_APPROVE_FMA]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_SNC_ON_SCHEME_APPROVE_PMC]: "%USER% %AR_STATUS% 'policy terms'.",
  [ATA_SNC_ON_SCHEME_APPROVE_SIP]: "%USER% %AR_STATUS% 'statement of investment principles'.",
  [ATA_SNC_ON_SPNSR_CONSULTED]: '%USER% confirmed sponsor consultation.',
  [ATA_SNC_ON_CLIENT_EXECUTION_STATE_CHANGE]: '%USER% changed client execution status of legal documents.',
  [ATA_SNC_ON_LGIM_EXECUTION_STATE_CHANGE]: '%USER% changed execution status of legal documents.',
  [ATA_SNC_ON_ACTIVE_MANDATE]: "%USER% activated 'update scheme name'.",

  // active workflow - trustee change - TC
  [ATA_TC_ON_TRUSTEE_CHANGE]: "%USER% requested 'update trustee information'.",
  [ATA_TC_ON_APPROVE_TRUSTEE]: '%USER% %AR_STATUS% new trustees.',
  [ATA_TC_ON_APPROVE_LGIM]: '%USER% %AR_STATUS% new trustees.',

  // active workflow - fm fee
  [ATA_CFMF_ON_CHANGE_FM_FEE]: "%USER% changed 'approve investment management fee change'.",
  [ATA_CFMF_ON_GENERATE_FMA]: "%USER% %UPLOADORGENERATED% '%DOC%'.",
  [ATA_CFMF_ON_APPROVE_FMA]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_CFMF_ON_PUBLISH_FMA]: "%USER% published 'investment management agreement' attachment.",
  [ATA_CFMF_ON_TRUSTEE_APPROVE_FMA]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_CFMF_ON_ACTIVATE_MANDATE]: "%USER% activated 'approve investment management fee change'.",

  // active workflow - advisory fee
  [ATA_CAF_ON_CHANGE_ADVISORY_FEE]: "%USER% changed 'advisory fee'.",
  [ATA_CAF_ON_GENERATE_IAA]: "%USER% %UPLOADORGENERATED% 'advisory agreement'.",
  [ATA_CAF_ON_APPROVE_IAA]: "%USER% %AR_STATUS% 'advisory agreement'.",
  [ATA_CAF_ON_PUBLISH_IAA]: "%USER% published 'advisory agreement'.",
  [ATA_CAF_ON_TRUSTEE_APPROVE_IAA]: "%USER% %AR_STATUS% 'advisory agreement'.",
  [ATA_CAF_ON_ACTIVATE_MANDATE]: "%USER% activated 'advisory fee change'.",

  // active workflow - additional report
  [ATA_AR_ON_REQUEST_ADDITIONAL_REPORT]: "%USER% requested '%DOC%'.",
  [ATA_AR_ON_GENERATE_ADDITIONAL_REPORT]: "%USER% generated '%DOC%'.",
  [ATA_AR_ON_APPROVE_SCHEME_ANNUAL_REPORT]: "%USER% %AR_STATUS% 'scheme annual report'.",
  [ATA_AR_ON_APPROVE_COMPANY_ANNUAL_REPORT]: "%USER%  %AR_STATUS% 'company annual report'.",
  [ATA_AR_ON_APPROVE_TPR_REPORT]: "%USER%  %AR_STATUS% 'tPR annual report'.",
  [ATA_AR_ON_PUBLISH_ADDITIONAL_REPORT]: "%USER% published '%DOC%'.",
  [ATA_AR_ON_SAVE_REPORT_DIRECTORY]: "%USER% saved '%DOC%' in report directory.",

  // active workflow - deficit contribution
  [ATA_DC_ON_DEFICIT_CONTRIBUTION_UPDATE]: "%USER% updated 'deficit contributions'.",
  [ATA_DC_ON_DEFICIT_CONTRIBUTION_DOWNLOAD]: "%USER% reviewed 'deficit contributions'.",
  [ATA_DC_ON_GENERATE_ADVISORY_REPORT]: "%USER% %UPLOADORGENERATED% 'short advice report'.",
  [ATA_DC_ON_APPROVE_ADVISORY_REPORT]: "%USER% %AR_STATUS% 'short advice report'.",
  [ATA_DC_ON_PUBLISH_ADVISORY_REPORT]: "%USER% published 'short advice report'.",
  [ATA_DC_ON_APPROVE_DEFICIT_CONTRIBUTION]: "%USER% %AR_STATUS% the 'update deficit contributions'.",
  [ATA_DC_ON_ACTIVE_MANDATE]: "%USER% activated 'deficit contribution update'.",

  // active workflow - update SIP
  [ATA_US_ON_UPLOAD_SIP]: "%USER% %UPLOADORGENERATED% '%DOC%'.",
  [ATA_US_ON_APPROVE_SIP]: "%USER% %AR_STATUS% 'statement of investment principles'.",
  [ATA_US_ON_PUBLISH_SIP]: "%USER% published '%DOC%'.",
  [ATA_US_ON_SCHEME_APPROVE_SIP]: "%USER% %AR_STATUS% 'statement of investment principles'.",
  [ATA_US_ON_SPONSOR_CONSULT]: "%USER% confirmed 'sponsor consultation'.",
  [ATA_US_ON_ACTIVATE_MANDATE]: "%USER% activated 'review Statement of Investment Principles'.",

  // active workflow - update AVC details
  [ATA_AVC_ON_UPDATE_AVC_DETAILS]: '%USER% updated AVC details.',
  [ATA_AVC_ON_DOWNLOAD_AVC_DETAILS]: '%USER% approved AVC details.',
  [ATA_AVC_ON_UPLOAD_AVC_DOCS]: "%USER% %UPLOADORGENERATED% '%DOC%'.",
  [ATA_AVC_ON_APPROVE_AR]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_AVC_ON_APPROVE_SIP]: "%USER% %AR_STATUS% 'statement of investment principles'.",
  [ATA_AVC_ON_PUBLISH_AVC_DOCS]: "%USER% published '%DOC%'.",
  [ATA_AVC_ON_SCHEME_APPROVE_AR]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_AVC_ON_SCHEME_APPROVE_SIP]: "%USER% %AR_STATUS% 'statement of investment principles'.",
  [ATA_AVC_ON_SPONSOR_CONSULT]: "%USER% confirmed 'sponsor consultation'.",
  [ATA_AVC_ON_ACTIVATE_MANDATE]: "%USER% activated 'AVC details update'.",

  // active workflow - full strategy review
  [ATA_FSR_ON_UPDATE_FSR]: "%USER% updated 'request strategy review details'.",
  [ATA_FSR_ON_DOWNLOAD_FSR]: "%USER% reviewed 'request strategy review request'.",
  [ATA_FSR_ON_UPLOAD_FSR_DOCS]: "%USER% %UPLOADORGENERATED% '%DOC%'.",
  [ATA_FSR_ON_APPROVE_AR]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_FSR_ON_APPROVE_SIP]: "%USER% %AR_STATUS% 'statement of investment principles'.",
  [ATA_FSR_ON_APPROVE_FMA]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_FSR_ON_PUBLISH_FSR_DOCS]: "%USER% published '%DOC%'.",
  [ATA_FSR_ON_SCHEME_APPROVE_AR]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_FSR_ON_SCHEME_APPROVE_SIP]: "%USER% %AR_STATUS% 'statement of investment principles'.",
  [ATA_FSR_ON_SCHEME_APPROVE_FMA]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_FSR_ON_SPONSOR_CONSULT]: "%USER% confirmed 'sponsor consultation'.",
  [ATA_FSR_ON_LGIM_EXECUTION_STATE_CHANGE]: "%USER% changed execution status of 'investment management agreement'.",
  [ATA_FSR_ON_ACTIVATE_MANDATE]: "%USER% activated 'strategy review'.",

  // Active workflow - Return target update
  [ATA_RTU_ON_UPDATE_RTU_DETAILS]: "%USER% requested 'update return target'.",
  [ATA_RT_ON_DOWNLOAD_DRT]: "%USER% reviewed 'return target update request'.",
  [ATA_RTU_ON_UPLOAD_RTU_DOCS]: "%USER% %UPLOADORGENERATED% '%DOC%'.",
  [ATA_RTU_ON_APPROVE_AR]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_RTU_ON_APPROVE_SIP]: "%USER% %AR_STATUS% 'statement of investment principles'.",
  [ATA_RTU_ON_APPROVE_FMA]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_RTU_ON_PUBLISH_RTU_DOCS]: "%USER% published '%DOC%'.",
  [ATA_RTU_ON_SCHEME_APPROVE_AR]: "%USER% %AR_STATUS% 'advisory report'.",
  [ATA_RTU_ON_SCHEME_APPROVE_SIP]: "%USER% %AR_STATUS% 'statement of investment principles'.",
  [ATA_RTU_ON_SCHEME_APPROVE_FMA]: "%USER% %AR_STATUS% 'investment management agreement'.",
  [ATA_RTU_ON_SPONSOR_CONSULT]: "%USER% confirmed 'sponsor consultation'.",
  [ATA_RTU_ON_LGIM_EXECUTION_STATE_CHANGE]: "%USER% changed execution status of 'investment management agreement'.",
  [ATA_RTU_ON_ACTIVATE_MANDATE]: "%USER% activated 'update return target'.",

  // scheme user remove
  [ATA_ON_USER_REMOVED_FROM_SCHEME]: '%USER% removed a user from the scheme.',

  // user remove form system
  [ATA_ON_REJECT_USER_DELETE_REQUEST_LGIM]:
    '%USER% rejected %SCHEMEUSER% request to remove their account from the platform.',
  [ATA_ON_REJECT_USER_DELETE_REQUEST_CLIENT]:
    'LGIM rejected %SCHEMEUSER% request to remove their account from the platform.',
  [ATA_ON_USER_ACCOUNT_DELETED]: '%DELETEUSER% account removed from the platform.',
  [ATA_ON_SEND_DELETE_REQUEST]: '%DELETEUSER% requested to remove their account from the platform.',

  [ATA_DC_ON_KEY_MATRIX_TABLE]: '%USER% changed %KEYMATRIXFLAG% from key matrix table.',
};