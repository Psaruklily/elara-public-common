import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Carousel,
  Button,
  TruncatedText,
  Footer,
  ScheduleVisitPopup,
  ContactSupportLink,
  Divider,
} from '../../components';
import { currencyFormatter } from '../../helpers';
import { IDeviceModel, IProperty } from '../../interfaces';
import {
  HomeMetrics,
  HomeInfo,
  HomeComesWith,
  HomeLocation,
  SchoolsNearby,
} from './partials';
import { useSubscription } from '../../hooks';
import { propertiesDataService, imagesDataService, deviceManager } from '../../services';
import './styles.scss';

interface ParamTypes {
  homeId: string;
}

export default function HomeDetailsPage() {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [homeDetails, setHomeDetails] = useState<IProperty | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [device, setDevice] = useState<IDeviceModel | null>(null);

  const { homeId } = useParams<ParamTypes>();
  useSubscription(propertiesDataService.getProperty(homeId), setHomeDetails);
  useSubscription(imagesDataService.getHouseImages(homeId), setImages);
  useSubscription(deviceManager.device, setDevice);

  if (!homeDetails) return null;

  const slidesPerView = device?.isMobile ? Math.min(images.length, 1.5) : Math.min(images.length, 2.5);
  const slidesSpacing = device?.isMobile ? 4 : 8;
  const divider = <Divider margin={device?.isMobile ? '32px 0' : '40px 0'} />;

  return (
    <div className="HomeDetailsPage">
      <Carousel
        images={images}
        slidesPerView={slidesPerView}
        spacing={slidesSpacing}
        withArrows={device?.isDesktop}
      />

      <div className="HomeDetailsPage__content">
        <div className="HomeDetailsPage__description">
          <div>
            <h1>{homeDetails.address}</h1>
            {/*<p>{homeDetails.area}</p>*/}

            <HomeMetrics
              beds={homeDetails.beds}
              baths={homeDetails.baths}
              size={homeDetails.size}
            />

            <TruncatedText text={homeDetails.script} />
          </div>

          <div className="HomeDetailsPage__schedule-visit">
            <div className="HomeDetailsPage__schedule-visit__amount">
              {currencyFormatter.format(homeDetails.price)}
              <span>per month</span>
            </div>

            <Button
              text="Schedule a visit"
              onClick={() => setPopupVisibility(true)}
            />

            {isPopupVisible && (
              <ScheduleVisitPopup closePopup={() => setPopupVisibility(false)} />
            )}
          </div>
        </div>

        {divider}

        <HomeInfo homeDetails={homeDetails} />

        {Boolean(homeDetails.comesWith.length) && (
          <>
            {divider}

            <HomeComesWith comesWith={homeDetails.comesWith} />
          </>
        )}

        {divider}

        <HomeLocation coordinates={homeDetails.coordinates} />

        {Boolean(homeDetails.schools.length) && (
          <>
            {divider}

            <SchoolsNearby schools={homeDetails.schools} />
          </>
        )}

        {divider}

        <div className="HomeDetailsPage__contacts">
          <p>
            <span>Interested in this house?&nbsp;</span>
            <span
              className="HomeDetailsPage__contacts__schedule-visit"
              onClick={() => setPopupVisibility(true)}
              role="button"
              tabIndex={0}
            >
              Schedule a visit now &gt;
            </span>
          </p>
          <p>
            <span>Or contact us at&nbsp;</span>
            <ContactSupportLink />
            <span>&nbsp;if you have any questions.</span>
          </p>

          {/*<h3>For Sale Information</h3>*/}

          {/*<p>*/}
          {/*  The information and images in this listing are generated from RealTracs,*/}
          {/*  and RealTracs owns all copyrights to the images and information.*/}
          {/*  Listing agent: Kisty Cartwright 6158386755*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*  Picket, in association with Omni Realtors & Property Management,*/}
          {/*  has selected this listing for display. The information and*/}
          {/*  images in this listing are generated from RealTracs,*/}
          {/*  and RealTracs owns all copyrights to the images and information.*/}
          {/*</p>*/}
        </div>
      </div>

      {device?.isDesktop && <Footer />}
    </div>
  );
}
