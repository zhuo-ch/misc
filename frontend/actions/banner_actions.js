export const RECEIVE_ALL_BANNERS = 'RECEIVE_ALL_BANNERS';
export const RECEIVE_CURRENT_BANNER = 'RECEIVE_CURRENT_BANNER';

export const fetchAllBanners = () => dispatch => {
  dispatch(receiveAllBanners(allBanners));
}

export const setCurrentBanner = banner => dispatch => {
  dispatch(receiveCurrentBanner(banner));
}

const receiveAllBanners = banners => ({
  type: RECEIVE_ALL_BANNERS,
  banners,
});

const receiveCurrentBanner = currentBanner => ({
  type: RECEIVE_CURRENT_BANNER,
  currentBanner,
});

const allBanners = {
  1: {header: 'June is National Safety Month', tagline: 'Hurray for Safety', title: 'safety'},
  2: {header: 'Dads and Grads', tagline: 'Celebrate with the perfect gift', title: 'dads'},
  3: {header: 'BBF Sale', tagline: 'shop for everything', title: 'sale'},
}
