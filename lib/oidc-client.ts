import { UserManager, WebStorageStateStore, Log, UserManagerSettings } from 'oidc-client-ts';

let userManager: UserManager | null = null;

function createOidcConfig(): UserManagerSettings {
  if (typeof window === 'undefined') {
    return {
      authority: '',
      client_id: '',
      redirect_uri: '',
      response_type: 'code',
      scope: '',
      post_logout_redirect_uri: '',
      userStore: undefined,
    };
  }
  return {
    authority: 'https://kauth.kakao.com',
    client_id: 'c82e4b6293f3f263f3924e92294f0439',
    redirect_uri: `${window.location.origin}/oidc-callback`,
    response_type: 'code',
    scope: ['openid', 'account_email', 'profile_nickname', 'profile_image'].join(' '),
    post_logout_redirect_uri: window.location.origin,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  };
}

export function getUserManager(): UserManager {
  if (!userManager) {
    const settings = createOidcConfig();
    userManager = new UserManager(settings);
    userManager.events.addAccessTokenExpiring(() => {
      console.warn('access token expiring');
    });
    userManager.events.addAccessTokenExpired(() => {
      console.warn('access token expired');
    });
  }
  return userManager;
}
