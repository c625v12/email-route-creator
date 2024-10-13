import { getDefaultStore } from 'jotai';
import { stringNotInArrayValidator } from '../util/utility';
import { domainAtom, emailRoutesAtom } from '../jotai/atoms';

const useEmailRouteValidator = (
  emailRoute: string | undefined
): boolean | '' | undefined => {
  const store = getDefaultStore();
  const emailRoutes = store.get(emailRoutesAtom);
  const domain = store.get(domainAtom);

  if (emailRoute && emailRoutes) {
    return stringNotInArrayValidator(emailRoutes, domain, emailRoute);
  }

  return undefined;
};

export default useEmailRouteValidator;
