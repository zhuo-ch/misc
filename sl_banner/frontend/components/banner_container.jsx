import React from 'react';
import { connect } from 'react-redux';
import { fetchAllBanners } from '../actions/banner_actions';
import SideBar from './side_bar';
import { Banner } from './banner';

class BannerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrentBanner = this.getCurrentBanner.bind(this);
  }

  componentWillMount() {
    this.props.fetchAllBanners();
  }

  getCurrentBanner() {
    const banner = this.props.banners[this.props.currentBanner];
    return <Banner banner={ banner } />
  }

  render() {
    const currentBanner = this.getCurrentBanner();
    
    return (
      <div className='banner-container'>
        { currentBanner }
        <SideBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentBanner: state.banner.currentBanner,
  banners: state.banner.banners,
})

const mapDispatchToProps = dispatch => ({
  fetchAllBanners: () => dispatch(fetchAllBanners()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BannerContainer);
