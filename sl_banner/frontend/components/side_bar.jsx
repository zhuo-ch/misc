import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentBanner, setTarget } from '../actions/banner_actions';
import FontAwesome from 'react-fontawesome';

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.getNavArrows = this.getNavArrows.bind(this);
    this.getSideBarList = this.getSideBarList.bind(this);
    this.getArrow = this.getArrow.bind(this);
    this.getToggle = this.getToggle.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleHover(e) {
    e.preventDefault();
    this.handleSetBanner(parseInt(e.currentTarget.value));
  }

// on the working site, handleClick's push call will send the user
// to the target page or, if this were a single page app, handleClick
// could trigger a render of a target component or search

  handleClick(e) {
    e.preventDefault();

    if (e.currentTarget.value) {
      this.handleSetBanner(parseInt(e.currentTarget.value));
      this.props.history.push(`${ this.props.banners[e.currentTarget.value].title }/`)
    } else {
      this.handleSetBanner(this.getToggle(e.currentTarget.id));
    }
  }

  handleSetBanner(banner) {
    this.props.setCurrentBanner({currentBanner: banner})
  }

  getToggle(toggleNum) {
    const num = parseInt(toggleNum);
    const newNum = this.props.currentBanner + num;
    const keys = Object.keys(this.props.banners).map(key => parseInt(key));

    if (newNum < Math.min.apply(Math, keys)) {
      return Math.max.apply(Math, keys);
    } else if (newNum > Math.max.apply(Math, keys)) {
      return Math.min.apply(Math, keys);
    } else {
      return newNum;
    }
  }

  getArrow(direction) {
    const faName = 'chevron-' + direction;
    const tName = direction === 'up' ? '-1' : '1';

    return (
      <article
        className='arrow'
        type={ direction }
        id={ tName }
        onClick={ this.handleClick }>
        <FontAwesome name={ faName } className='icon' />
      </article>
    )
  }

  getNavArrows() {
    return (
      <section className='nav-arrows'>
        { this.getArrow('up') }
        { this.getArrow('down') }
      </section>
    )
  }

  getSideBarItem(key, item) {
    const cName = parseInt(key) === this.props.currentBanner ? 'side-bar-item targeted' : 'side-bar-item';

    return (
      <li className={ cName } value={ key } key={ key } onClick= { this.handleClick }
        onMouseOver={this.handleHover}>
        <section className='item-image'>
          <img src={ 'assets/images/' + item.title + '-mini.jpg' } />
        </section>
        <section className='item-text'>
          <h4>{ item.header }</h4>
          <h5>{ item.tagline }</h5>
        </section>
      </li>
    );
  }

  getSideBarList() {
    const list = Object.keys(this.props.banners).sort().map(key => {
      return this.getSideBarItem(key, this.props.banners[key]);
    });

    return <ul className='side-bar-list'>{ list }</ul>;
  }

  render() {
    const navArrows = this.getNavArrows();
    const sideBarList = this.getSideBarList();

    return (
      <div className='side-bar'>
        { navArrows }
        { sideBarList }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentBanner: state.banner.currentBanner,
  banners: state.banner.banners,
});

const mapDispatchToProps = dispatch => ({
  setCurrentBanner: banner => dispatch(setCurrentBanner(banner)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
