
// const URL = 'http://localhost:5000'
const URL = 'https://e-box-vlu.herokuapp.com'

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
    activateUser: `${URL}/api/admin/user/restore_user`,
    restoreQuestion:`${URL}/api/admin/mailbox/restore_question`,
    sendMessage:`${URL}/api/user/inbox/send_message`,
    sendComment: `${URL}/api/user/comment/send_comment`,
    watchNotification: `${URL}/api/user/notification/watched`,
    likeQuestion: `${URL}/api/user/mailbox/like`,
    fetchQuestionTypes: `${URL}/api/admin/type/list_types_admin`,
    fetchAccount: `${URL}/api/user/account_info`, 
    fetchRoleList: `${URL}/api/admin/role/list_roles`, 
    fetchUsersList: `${URL}/api/admin/user/list_users`,
    fetchQuestionList: `${URL}/api/admin/mailbox/list_questions_admin`,
    fetchQuestionDetail: `${URL}/api/user/mailbox/details_question?id_question=`,
    fetchQuestionBasedOnStatus: `${URL}/api/mailbox/list_questions?status=`,
    fetchQuestionListUser: `${URL}/api/user/mailbox/list_questions_user`,
    fetchAccountStatus: `${URL}/api/admin/status/list_status`,
    fetchNotifications: `${URL}/api/user/notification/list_notification`,
    fetchUsersContact: `${URL}/api/user/conversation/list_conversations`,
    fetchConversation: `${URL}/api/user/inbox/list_messages?id_conversation=`,
    fetchComments: `${URL}/api/user/comment/list_comments?id_question=`,
    fetchStatistics: `${URL}/api/admin/mailbox/statistical`
}
export default Requests;
