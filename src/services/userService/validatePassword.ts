import { passwordHelper } from '../../utils';
import { createError, ResponseErrorTypeENUM } from '../errorHelper';

const validatePassword = (bodyPassword: string, userPassword: string) => {
  const isPasswordMatch = passwordHelper.compare(bodyPassword, userPassword);

  if (!isPasswordMatch) {
    throw createError({
      message: 'Wrong password',
      type: ResponseErrorTypeENUM.authorization,
    });
  }
};

export default validatePassword;
