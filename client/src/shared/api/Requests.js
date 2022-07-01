
const Requests = {
    loginRequest: "http://localhost:5000/api/user/login",
    changePwRequest: 'http://localhost:5000/api/user/change_password',
    addUserRequest: 'http://localhost:5000/api/user/add_user', 
    publishQuestion: 'http://localhost:5000/api/mailbox/publish_question',
    approveQuestion: 'http://localhost:5000/api/mailbox/approve_question',
    refuseQuestion: 'http://localhost:5000/api/mailbox/refuse_question',
    fetchAccount: 'http://localhost:5000/api/user/account_info', 
    fetchRoleList: 'http://localhost:5000/api/role/list_roles', 
    fetchUsersList: 'http://localhost:5000/api/user/list_users',
    fetchQuestionList: 'http://localhost:5000/api/mailbox/list_questions',
    fetchQuestionBasedOnStatus: 'http://localhost:5000/api/mailbox/list_questions?status=',
}

export default Requests;