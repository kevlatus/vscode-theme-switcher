import * as got from 'got';

export function trackEvent(cid: string, category: string, action: string, label: string, value: string) {
  const data = {
    // API Version.
    v: '1',
    // Tracking ID / Property ID.
    tid: 'UA-125467624-3',
    // Anonymous Client Identifier. Ideally, this should be a UUID that
    // is associated with particular user, device, or browser instance.
    cid,
    // Event hit type.
    t: 'event',
    // Event category.
    ec: category,
    // Event action.
    ea: action,
    // Event label.
    el: label,
    // Event value.
    ev: value,
  };

  return got.post('http://www.google-analytics.com/collect', data);
}