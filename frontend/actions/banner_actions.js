export const RECEIVE_ALL_BANNERS = 'RECEIVE_ALL_BANNERS';
export const RECEIVE_CURRENT_BANNER = 'RECEIVE_CURRENT_BANNER';

// on the working site, fetchAllBanners would be sending
// an ajax request to retrieve banner data

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

// this is representative of what the server side table
// would look like. This would would simplify changing and/or
// rotating banners

const allBanners = {
  1: {header: 'June is National Safety Month', tagline: "When you need safety, we've got the net", title: 'safety'},
  2: {header: 'Dads', tagline: 'Celebrate dad with the perfect gift', title: 'dads'},
  3: {header: 'Grads', tagline: 'This momentous occasion deserves something special', title: 'grads'},
}
