
require('dotenv').config();

function getEnv(key: string, defValue?: string): string {
    let reValue = process.env[key] || defValue;

    if(!reValue) {
        // reValue 없는 경우 에외처리 부분
        // TODO: 추후 수정 예정
        reValue = 'ERROR OCCURS';
    }
    return reValue;
}

const SRV_STATE = getEnv('SERVER_STATE');

export const config = {
    db: {
        host: getEnv(`${SRV_STATE}_DB_HOST`),
        port: getEnv(`${SRV_STATE}_DB_PORT`),
        name: getEnv(`${SRV_STATE}_DB_NAME`),
    },

    server: {
        state: SRV_STATE,
        port: getEnv(`${SRV_STATE}_SERVER_PORT`),
    },


}
