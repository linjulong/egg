class Status {
    //请求状态Status码

    static SUCCESS = {
        OK: 200,
        CREATED: 201,
        DELETE: 204
    }

    static FAIL = {
        INVALID_REQUEST: { //用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的
            CODE: 400,
            MSG: 'invalid_request'
        },
        UNAUTHORIZED: 401, //TOKEN失效
        FORBIDDEN: 403, //权限不足
        NOT_FOUND: 404,
        GONE: 410, //用户请求的资源被永久删除，且不会再得到的
        OVERLOAD: 413, //请求体过大
        UNPROCESABLE_ENTITY: {//请求参数错误
            CODE: 422,
            msg: 'Validation failed'
        },
        INTERNAL_SERVER_ERROR: 500 //服务器错误
    }

}

class Code {

    static SUCCESS = 20000;

    static FAIL = {
        ACCOUNT_DOES_NOT_EXIST: {
            CODE: 50001,
            MSG: 'Login fail!Account does not exist'
        },
        PASSWORD_ERROR: {
            CODE: 50002,
            MSG: 'Login fail!Password error'
        },
        ILLEGAL_TOKEN: {
            CODE: 50008,
            MSG: 'Illegal token'
        },
        TOKEN_EXPIRED: {
            CODE: 50014,
            MSG: 'Token expired'
        }
    }

}

module.exports = {
    Status,
    Code
};