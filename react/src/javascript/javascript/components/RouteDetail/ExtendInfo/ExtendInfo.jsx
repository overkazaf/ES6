import React, {Component} from 'react';
import Gallery from 'components/Gallery/Gallery';
import './ExtendInfo.scss'


export default class ExtendInfo extends Component {

	constructor (props) {
		super(props);
	}

	render () {
		let that = this;
		let info = this.props.info;
		let contents = info ? 
						info.map(function (item, index) {
							let href = item.href;
							let name = item.name;
							if (index === 0) {
								return that.buildScheduleList(item, index);
							} else {
								
								if (index === 1) {
                                        return (
                                            <li className="extra-info-list-item">
                                                
                                                <a href={href} id={href} className="block-anchor">
                                                    <div className="feature-bg"></div>
                                                </a>
                                            </li>
                                        )

                                   } else {
                                        return (
                                            <li className="extra-info-list-item">
                                                
                                                <a href={href} id={href} className="block-anchor">
                                                    <div className="fee-bg"></div>
                                                </a>
                                            </li>
                                        )
                                   }
							}

						}) : null;

		return (
			<ul className="extro-info-list">
				{contents}
			</ul>
		)
	}

	buildScheduleList (item, idx) {
		let list = item.scheduleList;
		let headImage = item.headImage;
		let name = item.name;
		let href = item.href;
		let contents = list.map(function (obj, index) {
			let {
				dayName,
				headImage,
				placeList
			} = obj;

			let galleryLists = placeList.map(function (place, index){
				let {
					placeName,
					placeDesc,
					placeImageList,
					placeIconClazz
				} = place;

				let placeClazz = "place-icon " + placeIconClazz;
                let placeIcon = (<span className={placeClazz}></span>)
                

				return (
					<div key={index}>
						<div className="place-info">
							{placeIcon}
							<div className="place-name">
								{placeName}
								<span className="place-desc">{placeDesc}</span>
							</div>
						</div>
						<Gallery pics={placeImageList} />
					</div>
				)
			});
			
			return (
				<section className="day-section" key={index}>
					<span className="day-icon"></span>
					<div className="day-name">
						{dayName}
					</div>
					{galleryLists}
				</section>
			)
		});

		return (
			<li key={idx} className="extra-info-list-item">
				<a href={href} id={href}>
					<div className="head-image">
						
					</div>
					{contents}
				</a>
			</li>
		)
	}
}
