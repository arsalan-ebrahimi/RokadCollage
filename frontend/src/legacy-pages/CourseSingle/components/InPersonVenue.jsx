import React from "react";
import { MapPin, Train, Car, Calendar, ExternalLink } from "lucide-react";

export default function InPersonVenue({ venue, cleanDays, cleanHours, cleanRoom }) {
  return (
    <section className="cs-ip-section-card" id="campus-location">
      <div className="cs-ip-sec-header">
        <div className="cs-ip-sec-header-right">
          <span className="cs-ip-sec-num">۰۳</span>
          <div className="cs-ip-sec-icon-box">
            <MapPin size={18} />
          </div>
          <div className="cs-ip-sec-titles">
            <h2 className="cs-ip-sec-title">زمان‌بندی، موقعیت و دسترسی کمپوس</h2>
            <span className="cs-ip-sec-sub">روزهای برگزاری کارگاه، آدرس دقیق و راه‌های دسترسی</span>
          </div>
        </div>
        <span className="cs-ip-sec-badge">محل و زمان کارگاه</span>
      </div>

      <div className="cs-ip-sec-body">
        <div className="cs-inperson-location-panel">
          <div className="cs-inperson-location-grid">
            <div className="cs-inperson-address-card">
              <div className="address-meta">
                <strong>{venue.name}</strong>
                <p>{venue.address}</p>
              </div>
              <div className="transit-items">
                <div className="transit-it">
                  <Train size={16} />
                  <span>{venue.metro}</span>
                </div>
                <div className="transit-it">
                  <Car size={16} />
                  <span>{venue.parking}</span>
                </div>
              </div>
            </div>

            <div className="cs-inperson-schedule-card">
              <div className="cs-ip-sch-head">
                <div className="cs-ip-sch-icon">
                  <Calendar size={18} />
                </div>
                <div>
                  <strong>برنامهٔ زمانی و روزهای کلاس</strong>
                  <span>جلسات هفتگی کارگاه در کمپوس</span>
                </div>
              </div>

              <div className="cs-ip-sch-rows">
                <div className="cs-ip-sch-row">
                  <span className="sch-label">روزهای برگزاری:</span>
                  <span className="sch-val highlight">{cleanDays}</span>
                </div>
                <div className="cs-ip-sch-row">
                  <span className="sch-label">ساعت کارگاه:</span>
                  <span className="sch-val">{cleanHours}</span>
                </div>
                <div className="cs-ip-sch-row">
                  <span className="sch-label">سالن اختصاصی:</span>
                  <span className="sch-val">{cleanRoom}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cs-inperson-map-actions">
            <a href={venue.neshanUrl || "https://nshn.ir"} target="_blank" rel="noreferrer" className="map-link-btn">
              <span>مسیریابی با نشان</span>
              <ExternalLink size={13} />
            </a>
            <a href={venue.baladUrl || "https://balad.ir"} target="_blank" rel="noreferrer" className="map-link-btn">
              <span>مسیریابی با بلد</span>
              <ExternalLink size={13} />
            </a>
            <a href={venue.googleMapUrl || "https://maps.google.com"} target="_blank" rel="noreferrer" className="map-link-btn">
              <span>گوگل‌مپ</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
