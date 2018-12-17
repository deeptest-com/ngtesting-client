export const CONSTANT: CONSTANT_INTERFACE = {

  SERVICE_URL: undefined,
  API_URL: undefined,

  API_PATH: 'api/v1/',
  UPLOAD_URI: 'api/v1/uploadSingle',

  CURR_ORG_ID: undefined,
  CURR_PRJ_ID: undefined,
  CURR_ORG_NAME: undefined,
  CURR_PRJ_NAME: undefined,

  WORK_PRJ_NAME: undefined, // 不一定是当期那项目

  TOKEN: undefined,

  PROFILE: undefined,

  SYS_PRIVILEGES: undefined,
  MY_ORGS: undefined,
  ORG_PRIVILEGES: undefined,
  RECENT_PROJECTS: undefined,
  PRJ_PRIVILEGES: undefined,
  RECENT_QUERIES: undefined,

  CASE_CUSTOM_FIELDS: undefined,
  CASE_PROPERTY_MAP: undefined,
  CASE_PROPERTY_VAL_MAP: undefined,

  ISU_PROPERTY_MAP: undefined,
  ISU_PROPERTY_VAL_MAP: undefined,

  TOKEN_KEY: 'com.ngtesting.token',
  TOKEN_EXPIRE: 'com.ngtesting.expire',

  ExeStatus: { '': '所有', 'not_start': '未开始', 'in_progress': '执行中', 'end': '已完成' },
  EntityDisabled: { 'false': '启用', 'true': '归档', '': '所有' },
  EntityRead: { '': '所有', 'false': '未读', 'true': '已读' },

  TrueOrFalse: { 'true': '是', 'false': '否' },
  DisableOrNot: { 'true': '禁用', 'false': '启动' },
  CaseExeStatus: { 'untest': '未执行', 'pass': '通过', 'fail': '失败', block: '阻塞' },

  FieldApplyTo: { 'test_case': '测试用例', 'test_result': '测试结果', 'issue': '问题' },
  FieldFormat: { 'rich_text': '富文本', 'plain_text': '纯文本' },

  ScreenSize: { h: 0, w: 0 },
  DebounceTime: 500,

  EVENT_LOADING_COMPLETE: 'loading.complete',
  // EVENT_PROPERTY_STATUS: 'property.status',
  // EVENT_COMMENTS_EDIT: 'comments.edit',
  // EVENT_COMMENTS_SAVE: 'comments.save',

  EVENT_CASE_EDIT: 'case.edit',
  EVENT_CASE_UPDATE: 'case.update',
  EVENT_CASE_EXE: 'case.exe',
  EVENT_CASE_JUMP: 'case.jump',

  HEAD_HEIGHT: 66,
  FOOTER_HEIGHT: 44,
  ISSUE_TQL_SPAN: 15,
  ZTREE_TOOOLBAR_HEIGHT: 38,

  ISSUE_JQL: '',
};

export interface CONSTANT_INTERFACE {
  SERVICE_URL: string;
  API_URL: string;

  API_PATH: string;
  UPLOAD_URI: string;

  CURR_ORG_ID: number;
  CURR_ORG_NAME: string;
  CURR_PRJ_ID: number;
  CURR_PRJ_NAME: string;

  WORK_PRJ_NAME: String;

  TOKEN: string;

  PROFILE: any;
  SYS_PRIVILEGES: any;

  MY_ORGS: any[];
  ORG_PRIVILEGES: any;
  RECENT_PROJECTS: any[];
  RECENT_QUERIES: any[];

  CASE_CUSTOM_FIELDS: any[];
  CASE_PROPERTY_MAP: any;
  CASE_PROPERTY_VAL_MAP: any;

  ISU_PROPERTY_MAP: any;
  ISU_PROPERTY_VAL_MAP: any;

  PRJ_PRIVILEGES: any;

  TOKEN_KEY: string;
  TOKEN_EXPIRE: string;

  ExeStatus: any;
  EntityDisabled: any;
  EntityRead: any;

  TrueOrFalse: any;
  DisableOrNot: any;
  CaseExeStatus: any;

  FieldApplyTo: any;
  FieldFormat: any;

  ScreenSize: any;
  DebounceTime: number;

  EVENT_LOADING_COMPLETE: string;
  // EVENT_PROPERTY_STATUS: string;
  // EVENT_COMMENTS_EDIT: string;
  // EVENT_COMMENTS_SAVE: string;

  EVENT_CASE_EDIT: string;
  EVENT_CASE_UPDATE: string;
  EVENT_CASE_EXE: string;
  EVENT_CASE_JUMP: string;

  HEAD_HEIGHT: number;
  FOOTER_HEIGHT: number;
  ISSUE_TQL_SPAN: number;
  ZTREE_TOOOLBAR_HEIGHT: number;

  ISSUE_JQL: string;
}

