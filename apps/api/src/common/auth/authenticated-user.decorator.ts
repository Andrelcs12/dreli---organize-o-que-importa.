import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export type AuthenticatedUser = {
  id: string;
};

type RequestWithUser = Request & { user: AuthenticatedUser };

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedUser => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
