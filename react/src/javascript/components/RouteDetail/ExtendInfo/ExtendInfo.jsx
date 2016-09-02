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
								return that.buildScheduleList(item);
							} else {
								let imageUrl = item.imageUrl;
								return (
									<li className="extra-info-list-item">
										<div className="head-image">
											{name}
										</div>
										<a href={href} id={href}>
											<img src={imageUrl} />
										</a>
									</li>
								)
							}

						}) : null;

		return (
			<ul className="extro-info-list">
				{contents}
			</ul>
		)
	}

	buildScheduleList (item) {
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
					placeImageList
				} = place;

				return (
					<div>
						<div className="place-info">
							<span className="place-icon"></span>
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
			<li className="extra-info-list-item">
				<a href={href} id={href}>
					<div className="head-image">
						{name}
					</div>
					{contents}
				</a>
			</li>
		)
	}
}
