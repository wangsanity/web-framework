/**
 * Name：City picker
 * Description: choose province, city and area,
 *  will improve to support different levels.
 * position format: vertical-horizontal. e.g. top-left
 */
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Provinces, Cities, Areas } from './data';
import { TextService } from '@/utils';
import { IControls } from '@/constants/texts/controls.i';
import './city-picker.scss';

interface Province {
  name: string;
  code: string;
}

interface City {
  name: string;
  code: string;
  provinceCode: string;
}

interface Area {
  name: string;
  code: string;
  provinceCode?: string;
  cityCode?: string;
}

export interface CityPickerResult {
  province?: Province | null;
  city?: City | null;
  area?: Area | null;
}

export interface CityPickerProps {
  isLoading?: boolean;
  children?: ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmEvent?: (result: CityPickerResult) => void;
  cancelEvent?: () => void;
  autoClose?: boolean;
  position?: string;
  width?: string;
  addressCode?: string;
}

export const CityPicker = ({
  confirmEvent,
  autoClose = true,
  cancelEvent,
  position,
  children,
  width,
  confirmButtonText,
  cancelButtonText,
  addressCode,
}: CityPickerProps) => {
  const [controlsText, setControlsText] = useState<IControls>({} as IControls);
  const allProvinces = Provinces;
  const allCityies = Cities;
  const allAreas = Areas;
  const [displayPopup, setDisplayPopup] = useState(false);
  const [styleObject, setStyleObject] = useState({});
  const [currentCities, setCurrentCities] = useState<City[]>([]);
  const [currentAreas, setCurrentAreas] = useState<Area[]>([]);
  const [currentProvince, setCurrentProvince] = useState<Province | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [currentArea, setCurrentArea] = useState<Area | null>(null);
  const [citySlotId, setCitySlotId] = useState('');

  useEffect(() => {
    setControlsText(TextService.controls);
  }, []);

  useEffect(() => {
    setCitySlotId('city-slot-wrapper-' + new Date().getTime());
  }, []);

  const updatePosition = useCallback(() => {
    setTimeout(() => {
      const slot = document.getElementById(citySlotId);
      const newPosition = (position || getAutoPosition()).split('-');
      setStyleObject({
        [newPosition[0] || 'top']: (slot ? slot.offsetHeight : 0) + 3 + 'px',
        [newPosition[1] || 'left']: 0,
        width: width || '260px',
      });
    });
  }, [position, width, citySlotId]);

  /**
   * set value by code or text, check code and text at the same time
   */
  const setDefault = useCallback(() => {
    let tempProvince = allProvinces[0];
    if (addressCode) {
      const pro = allProvinces.filter(
        (item) => item.code === addressCode.substring(0, 2)
      );
      if (pro && pro[0]) {
        tempProvince = pro[0];
      }
    }

    const tempCities = allCityies.filter(
      (item) => item.provinceCode === tempProvince.code
    );
    let tempCity = tempCities[0];
    if (addressCode) {
      const city = tempCities.filter(
        (item) => item.code === addressCode.substring(0, 4)
      );
      if (city && city[0]) {
        tempCity = city[0];
      }
    }

    const tempAreas = allAreas.filter(
      (item) => item.cityCode === tempCity.code
    );
    let tempArea = tempAreas[0];
    if (addressCode) {
      const area = tempAreas.filter(
        (item) => item.code === addressCode.substring(0, 4)
      );
      if (area && area[0]) {
        tempArea = area[0];
      }
    }

    setCurrentProvince(tempProvince);
    setCurrentCities(tempCities);
    setCurrentCity(tempCity);
    setCurrentAreas(tempAreas);
    setCurrentArea(tempArea);
  }, [allAreas, allCityies, allProvinces, addressCode]);

  useEffect(() => {
    setDefault();
    updatePosition();

    const onClickBody = () => {
      setDisplayPopup(false);
    };

    window.addEventListener('click', onClickBody);

    return () => {
      window.removeEventListener('click', onClickBody);
    };
  }, [setDefault, updatePosition]);

  const selectProvince = (item: Province) => {
    let currentCities = allCityies.filter(
      (city) => city.provinceCode === item.code
    );
    let currentCity = currentCities[0];
    let currentAreas = allAreas.filter(
      (area) => area.cityCode === currentCity.code
    );
    setCurrentProvince(item);
    setCurrentCities(currentCities);
    setCurrentCity(currentCity);
    setCurrentAreas(currentAreas);
    setCurrentArea(currentAreas[0]);
  };

  const selectCity = (city: City) => {
    let currentAreas = allAreas.filter((item) => item.cityCode === city.code);
    setCurrentCity(city);
    setCurrentAreas(currentAreas);
    setCurrentArea(currentAreas[0]);
  };

  const selectArea = (item: Area) => {
    setCurrentArea(item);
    if (autoClose) {
      onConfirm();
    }
  };

  const onConfirm = () => {
    const result: CityPickerResult = {
      province: currentProvince,
      city: currentCity,
    };
    result.area = currentArea;
    confirmEvent && confirmEvent(result);
    setDisplayPopup(false);
  };

  const onCancel = () => {
    cancelEvent && cancelEvent();
    setDisplayPopup(false);
  };

  // TODO: calculate the best position
  const getAutoPosition = () => {
    return 'top-left';
  };

  const onClickSlot = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!displayPopup) {
      setDisplayPopup(true);
      e.stopPropagation();
    }
  };

  const onClickPicker = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <div className="ctr-city-picker" onClick={(e) => onClickPicker(e)}>
      <div
        id={citySlotId}
        className="city-slot-wrapper"
        onClick={(e) => onClickSlot(e)}
      >
        {children}
      </div>
      {!displayPopup ? null : (
        <div className="city-picker-content" style={styleObject}>
          <div className="city-picker-wrapper">
            <div className="title-box">
              <div className="data-title province-title">
                {controlsText.province}
              </div>
              <div className="data-title city-title">{controlsText.city}</div>
              <div className="data-title town-title">{controlsText.town}</div>
            </div>
            <div className="data-area">
              <div className="province-box">
                {allProvinces.map((item, index) => (
                  <div
                    className="item-box"
                    onClick={() => selectProvince(item)}
                    key={index}
                  >
                    <span
                      title={item.name}
                      className={
                        item === currentProvince ? 'selected-item' : ''
                      }
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="city-box">
                {currentCities.map((item, index) => (
                  <div
                    className="item-box"
                    onClick={() => selectCity(item)}
                    key={index}
                  >
                    <span
                      title={item.name}
                      className={item === currentCity ? 'selected-item' : ''}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="area-box">
                {currentAreas.map((item, index) => (
                  <div
                    className="item-box"
                    onClick={() => selectArea(item)}
                    key={index}
                  >
                    <span
                      title={item.name}
                      className={item === currentArea ? 'selected-item' : ''}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {!autoClose && (
              <div className="tool-bar">
                <span
                  className="link-button"
                  onClick={() => onConfirm()}
                  data-testid="city-picker-confirm"
                >
                  {confirmButtonText || controlsText.confirm}
                </span>
                <span
                  className="link-button"
                  onClick={() => onCancel()}
                  data-testid="city-picker-cancel"
                >
                  {cancelButtonText || controlsText.cancel}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
