export interface PlayListDetail {
    id: number;
    name: string;
    coverImgId: number;
    coverImgUrl: string;
    coverImgId_str: string;
    adType: number;
    userId: number;
    createTime: number;
    status: number;
    opRecommend: boolean;
    highQuality: boolean;
    newImported: boolean;
    updateTime: number;
    trackCount: number;
    specialType: number;
    privacy: number;
    trackUpdateTime: number;
    commentThreadId: string;
    playCount: number;
    trackNumberUpdateTime: number;
    subscribedCount: number;
    cloudTrackCount: number;
    ordered: boolean;
    description: string;
    tags: string[];
    updateFrequency?: any;
    backgroundCoverId: number;
    backgroundCoverUrl?: any;
    titleImage: number;
    titleImageUrl?: any;
    englishTitle?: any;
    officialPlaylistType?: any;
    subscribers: PlayListDetailSubscribers[];
    subscribed: boolean;
    creator: PlayListDetailCreator;
    tracks: PlayListDetailTracks[];
    videoIds?: any;
    videos?: any;
    trackIds: PlayListDetailTrackIds[];
    shareCount: number;
    commentCount: number;
    remixVideo?: any;
    sharedUsers?: any;
    historySharedUsers?: any;
}

export interface PlayListDetailSubscribers {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    avatarUrl: string;
    accountStatus: number;
    gender: number;
    city: number;
    birthday: number;
    userId: number;
    userType: number;
    nickname: string;
    signature: string;
    description: string;
    detailDescription: string;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: string;
    authority: number;
    mutual: boolean;
    expertTags?: any;
    experts?: any;
    djStatus: number;
    vipType: number;
    remarkName?: any;
    authenticationTypes: number;
    avatarDetail?: any;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    anchor: boolean;
    avatarImgId_str: string;
}

export interface PlayListDetailCreatorAvatarDetail {
    userType: number;
    identityLevel: number;
    identityIconUrl: string;
}

export interface PlayListDetailCreator {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    avatarUrl: string;
    accountStatus: number;
    gender: number;
    city: number;
    birthday: number;
    userId: number;
    userType: number;
    nickname: string;
    signature: string;
    description: string;
    detailDescription: string;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: string;
    authority: number;
    mutual: boolean;
    expertTags?: any;
    experts?: any;
    djStatus: number;
    vipType: number;
    remarkName?: any;
    authenticationTypes: number;
    avatarDetail: PlayListDetailCreatorAvatarDetail;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    anchor: boolean;
    avatarImgId_str: string;
}

export interface PlayListDetailTracksAr {
    id: number;
    name: string;
    tns: any[];
    alias: any[];
}

export interface PlayListDetailTracksAl {
    id: number;
    name: string;
    picUrl: string;
    tns: any[];
    pic_str: string;
    pic: number;
}

export interface PlayListDetailTracksH {
    br: number;
    fid: number;
    size: number;
    vd: number;
}

export interface PlayListDetailTracksM {
    br: number;
    fid: number;
    size: number;
    vd: number;
}

export interface PlayListDetailTracksL {
    br: number;
    fid: number;
    size: number;
    vd: number;
}

export interface PlayListDetailTracks {
    name: string;
    id: number;
    pst: number;
    t: number;
    ar: PlayListDetailTracksAr[];
    alia: any[];
    pop: number;
    st: number;
    rt: string;
    fee: number;
    v: number;
    crbt?: any;
    cf: string;
    al: PlayListDetailTracksAl;
    dt: number;
    h: PlayListDetailTracksH;
    m: PlayListDetailTracksM;
    l: PlayListDetailTracksL;
    a?: any;
    cd: string;
    no: number;
    rtUrl?: any;
    ftype: number;
    rtUrls: any[];
    djId: number;
    copyright: number;
    s_id: number;
    mark: number;
    originCoverType: number;
    originSongSimpleData?: any;
    single: number;
    noCopyrightRcmd?: any;
    cp: number;
    mv: number;
    rtype: number;
    rurl?: any;
    mst: number;
    publishTime: number;
}

export interface PlayListDetailTrackIds {
    id: number;
    v: number;
    t: number;
    at: number;
    alg?: any;
    uid: number;
    rcmdReason: string;
    sc?: any;
}

export interface PlaylistHighqualityTag {
	id: number;
	name: string;
	type: number;
	category: number;
	hot: boolean;
}

// 相似歌单推荐
export interface PlaylistRelated {
    creator: PlaylistRelatedCreateor,
    coverImgUrl: string,
    name: string,
    id: string
}

export interface PlaylistRelatedCreateor {
    userId: string,
    nickname: string
}

// 歌单评论

export interface PlaylistHotComments {
    beReplied: any,
    commentId: number,
    commentLocationType: number,
    content: string,
    contentResource: null,
    decoration: any,
    expressionUrl: null,
    grade: null,
    liked: boolean,
    likedCount: number,
    needDisplayTime: boolean,
    parentCommentId: number,
    pendantData: PlaylistHotCommentsPendantData,
    repliedMark: null,
    showFloorComment: null,
    status: number,
    time: number,
    timeStr: string,
    user: PlaylistHotCommentsUser
}

export interface PlaylistHotCommentsPendantData {
    id: number,
    imageUrl: string
}

export interface PlaylistHotCommentsUser {
    anonym: number
    authStatus: number
    avatarDetail: null
    avatarUrl: string
    commonIdentity: null
    expertTags: null
    experts: null
    followed: boolean
    liveInfo: null
    locationInfo: null
    mutual: boolean
    nickname: string
    remarkName: null
    userId: number
    userType: number
    vipRights: any
    vipType: number
}