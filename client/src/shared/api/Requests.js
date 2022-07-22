
const URL = 'http://localhost:5000'

const Requests = {
    loginRequest: `${URL}/api/user/user/login`,
    changePwRequest: `${URL}/api/user/user/change_password`,
    addUserRequest: `${URL}/api/admin/user/add_user`, 
    publishQuestion: `${URL}/api/user/mailbox/publish_question`,
    approveQuestion: `${URL}/api/admin/mailbox/approve_question`,
    refuseQuestion: `${URL}/api/admin/mailbox/refuse_question`,
    replyQuestion: `${URL}/api/admin/mailbox/reply_question`,
    changeUserInfo: `${URL}/api/admin/user/change_user_information`,
    deactivateUser: `${URL}/api/admin/user/deactivate_user`,
    fetchQuestionTypes: `${URL}/api/admin/type/list_types_admin`,
    fetchAccount: `${URL}/api/user/account_info`, 
    fetchRoleList: `${URL}/api/admin/role/list_roles`, 
    fetchUsersList: `${URL}/api/admin/user/list_users`,
    fetchQuestionList: `${URL}/api/admin/mailbox/list_questions_admin`,
    fetchQuestionDetail: `${URL}/api/user/mailbox/details_question?id_question=`,
    fetchQuestionBasedOnStatus: `${URL}/api/mailbox/list_questions?status=`,
}
export default Requests;
