import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";

// guard 는 미들웨어 느낌.
// controller 진입 전에 거쳐 감
@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // 통과시킬건지 안시킬건지 설정
        return true;
    }

}