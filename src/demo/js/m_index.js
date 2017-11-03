import share from '../../common/js/share';
import shareData from '../js/m_index_share';

import '../css/m_index.scss';

share(shareData);
function getShareInfo(){
    var share={
        share_title: shareData.title,
        share_desc: shareData.desc,
        share_url: shareData.shareUrl,
        share_imgUrl: shareData.imgUrl
    };
    return share;
}