declare namespace QQMapWxNamespace {
  type ConstructorOptions = {
    /**
     * 开发密钥(key)，申请地址 https://lbs.qq.com/dev/console/key/manage
     */
    key: string;
  };

  type SearchOptions = {
    /**
     * POI搜索关键字
     * （默认周边搜索，若需要使用指定地区名称和矩形搜索，请使用region和rectangle参数，不能同时使用）
     */
    keyword: string;
    /**
     * 位置坐标
     * 1.String格式：lat<纬度>,lng<经度>（例：location: ‘39.984060,116.307520’）
     * 2.Object格式：
     * {
     *    latitude: 纬度,
     *    longitude: 经度
     * }
     * 默认是当前位置
     */
    location?: string | { latitude: string; longitude: string };
    /**
     * 短地址，缺省时返回长地址，可选值：‘short’
     */
    address_format?: "short";
    /**
     * 每页条目数，最大限制为20条，默认值10
     */
    page_size?: number;
    /**
     * 第x页，默认第1页
     */
    page_index?: number;
    /**
     * 指定地区名称，不自动扩大范围，如北京市,（使用该功能，若涉及到行政区划，建议将auto_extend设置为0）
     * 当用户使用泛关键词搜索时（如酒店、超市），这类搜索多为了查找附近， 使用location参数，
     * 搜索结果以location坐标为中心，返回就近地点，体验更优(默认为用户当前位置坐标)不与rectangle同时使用
     */
    region?: string;
    /**
     * 矩形区域范围，不与region同时使用
     * 格式：lat,lng<左下/西南>, lat,lng<右上/东北>(示例：rectangle:‘40.984061,116.307520,39.984060,116.507520’)
     * 该参数适用于 jssdkv1.1 jssdkv1.2
     */
    rectangle?: string;
    /**
     * 取值1：[默认]自动扩大范围；
     * 取值0：不扩大。 仅适用于默认周边搜索以及制定地区名称搜索。
     * 该参数适用于 jssdkv1.1 jssdkv1.2
     */
    auto_extend?: "0" | "1";
    /**
     * 最多支持五个分类
     * 搜索指定分类
     * category=公交站
     * 搜索多个分类
     * category=大学,中学
     * 排除指定分类
     * category<>商务楼宇
     * （注意参数值要进行url编码）
     * 该参数适用于 jssdkv1.1 jssdkv1.2
     */
    filter?: string;
    /**
     * 签名校验
     * 开启WebServiceAPI签名校验的必传参数，只需要传入生成的SK字符串即可，不需要进行MD5加密操作
     * 该参数适用于 jssdkv1.2
     */
    sig?: string;
  };

  type SearchResponse = {
    /**
     * 状态码，0为正常,
     * 310请求参数信息有误，
     * 311Key格式错误,
     * 306请求有护持信息请检查字符串,
     * 110请求来源未被授权
     */
    readonly status: number;
    /**
     * 状态说明，即对状态码status进行说明
     * 如：
     * status为0,message为"query ok",为正常,
     * status为310,message为"请求参数信息有误",
     * status为311,message为"key格式错误",
     * status为306,message为"请求有护持信息请检查字符串",
     * status为110,message为"请求来源未被授权"
     */
    readonly message: string;
    /**
     * 本次搜索结果总数
     */
    readonly count: number;
    /**
     * 搜索结果POI数组，每项为一个POI对象
     */
    readonly data: Array<{
      /**
       * POI唯一标识
       */
      readonly id: string;
      /**
       * POI名称
       */
      readonly title: string;
      /**
       * 地址
       */
      readonly address: string;
      /**
       * 电话
       */
      readonly tel: string;
      /**
       * POI分类
       */
      readonly category: string;
      /**
       * POI类型，值说明：0:普通POI / 1:公交车站 / 2:地铁站 / 3:公交线路 / 4:行政区划
       */
      readonly type: number;
      /**
       * 坐标
       */
      readonly location: {
        /**
         * 纬度
         */
        readonly lat: number;
        /**
         * 经度
         */
        readonly lng: number;
      };
      /**
       * 行政区划信息，目前仅提供adcode
       */
      readonly ad_info: {
        /**
         * 行政区划代码
         */
        readonly adcode: string;
      };
      /**
       * 轮廓，坐标数组，面积较大的POI会有，如住宅小区
       */
      readonly boundary: Array<{
        /**
         * 该POI的街景最佳查看场景及视角信息
         */
        readonly pano: {
          /**
           * 街景场景ID，若有pano信息，则id一定存在
           */
          readonly id: string;
          /**
           * 最佳偏航角，与正北方向夹角，街景相关知识请点击查看@see https://lbs.qq.com/webApi/javascriptV2/jsGuide/jsStreetview
           */
          readonly heading?: number;
          /**
           * 俯仰角
           */
          readonly pitch?: number;
          /**
           * 缩放级别
           */
          readonly zoom?: number;
        };
      }>;
    }>;
  };

  type SuggestionOptions = {
    /**
     * 用户输入的关键词（希望获取后续提示的关键词）
     */
    keyword: string;
    /**
     * 设置城市名，限制关键词所示的地域范围，如，仅获取“广州市”范围内的提示内容,默认值全国
     */
    region?: string;
    /**
     * 取值： 0：[默认]当前城市无结果时，自动扩大范围到全国匹配 1：固定在当前城市
     */
    region_fix?: 0 | 1;
    /**
     * 检索策略，目前支持：
     * policy=0：默认，常规策略
     * policy=1：本策略主要用于收货地址、上门服务地址的填写，
     * 提高了小区类、商务楼宇、大学等分类的排序，过滤行政区、
     * 道路等分类（如海淀大街、朝阳区等），排序策略引入真实用户对输入提示的点击热度，
     * 使之更为符合此类应用场景，体验更为舒适
     */
    policy?: 0 | 1;
    /**
     * 定位坐标，传入后，若用户搜索关键词为类别词（如酒店、餐馆时），与此坐标距离近的地点将靠前显示，
     * 格式： location=lat,lng （示例：location：39.11457,116.55332）
     */
    location?: string;
    /**
     * 是否返回子地点，如大厦停车场、出入口等取值：
     * 0 [默认]不返回
     * 1 返回
     * 该参数适用于 jssdkv1.1 jssdkv1.2
     */
    get_subpois?: 0 | 1;
    /**
     * 最多支持五个分类
     * 搜索指定分类
     * category=公交站
     * 搜索多个分类
     * category=大学,中学
     * （注意参数值要进行url编码）
     * 该参数适用于 jssdkv1.1 jssdkv1.2
     */
    filter?: string;
    /**
     * 短地址，缺省时返回长地址，可选值：'short’
     * 该参数适用于 jssdkv1.1 jssdkv1.2
     */
    address_format?: "short";
    /**
     * 每页条目数，最大限制为20条，默认值10
     * 该参数适用于 jssdkv1.1 jssdkv1.2
     */
    page_size?: number;
    /**
     * 第x页，默认第1页
     * 该参数适用于 jssdkv1.1 jssdkv1.2
     */
    page_index?: number;
    /**
     * 签名校验
     * 开启WebServiceAPI签名校验的必传参数，只需要传入生成的SK字符串即可，不需要进行MD5加密操作
     * 该参数适用于 jssdkv1.2
     */
    sig?: string;
  };

  type SuggestionResponse = {
    /**
     * 状态码，0为正常,
     * 310请求参数信息有误，
     * 311Key格式错误,
     * 306请求有护持信息请检查字符串,
     * 110请求来源未被授权
     */
    readonly status: number;
    /**
     * 状态说明，即对状态码status进行说明
     * 如：
     * status为0,message为"query ok",为正常,
     * status为310,message为"请求参数信息有误",
     * status为311,message为"key格式错误",
     * status为306,message为"请求有护持信息请检查字符串",
     * status为110,message为"请求来源未被授权"
     */
    readonly message: string;
    /**
     * 本次搜索结果总数
     */
    readonly count: number;
    /**
     * 搜索结果POI数组，每项为一个POI对象
     */
    readonly data: Array<{
      /**
       * POI唯一标识
       */
      readonly id: string;
      /**
       * POI名称
       */
      readonly title: string;
      /**
       * 地址
       */
      readonly address: string;
      /**
       * 省
       */
      readonly province: string;
      /**
       * 市
       */
      readonly city: string;
      /**
       * 行政区划代码
       */
      readonly adcode: string;
      /**
       * POI类型，值说明：0:普通POI / 1:公交车站 / 2:地铁站 / 3:公交线路 / 4:行政区划
       */
      readonly type: number;
      /**
       * 坐标
       */
      readonly location: {
        /**
         * 纬度
         */
        readonly lat: number;
        /**
         * 经度
         */
        readonly lng: number;
      };
    }>;
  };

  type CalculateDistanceOptions = {
    mode: string;
    /**
     * 位置坐标
     * 1.String格式：lat<纬度>,lng<经度>（例：location: ‘39.984060,116.307520’）
     * 2.Object格式：
     * {
     *    latitude: 纬度,
     *    longitude: 经度
     * }
     * 默认是当前位置
     */
    from: string | { latitude: string; longitude: string };
    /**
     * 终点坐标
     * 1.lat,lng;lat,lng… （经度与纬度用英文逗号分隔，坐标间用英文分号分隔）
     *    例：to: ‘39.984060,116.307520;39.984060,116.507520’）
     * 2.[{
     *   latitude: 纬度,
     *   longitude: 经度
     *  }, …]
     * (例：to:[{
     *      latitude:39.984060,
     *      longitude:116.307520
     *     },…])
     * 3.此格式主要对应search返回的数据结构格式，方便开发这批量转换
     * [{
     *  location: {
     *    lat: 纬度,
     *    lng: 经度
     *  }
     * }, …]
     * (例：to:[{
     *  location:{
     *    lat:39.984060,
     *    lng:116.307520
     *  }
     * },…])
     */
    to:
      | string
      | Array<{ latitude: string; longitude: string }>
      | Array<{ lat: string; lng: string }>;
    /**
     * 签名校验
     * 开启WebServiceAPI签名校验的必传参数，只需要传入生成的SK字符串即可，不需要进行MD5加密操作
     * 该参数适用于 jssdkv1.1 jssdkv1.2
     */
    sig?: string;
  };

  type CalculateDistanceResponse = {
    /**
     * 状态码，0为正常,
     * 310请求参数信息有误，
     * 311Key格式错误,
     * 306请求有护持信息请检查字符串,
     * 110请求来源未被授权
     */
    readonly status: number;
    /**
     * 状态说明，即对状态码status进行说明
     * 如：
     * status为0,message为"query ok",为正常,
     * status为310,message为"请求参数信息有误",
     * status为311,message为"key格式错误",
     * status为306,message为"请求有护持信息请检查字符串",
     * status为110,message为"请求来源未被授权"
     */
    readonly message: string;
    /**
     * 	计算结果
     */
    readonly result: {
      /**
       * 结果数组
       */
      readonly elements: Array<{
        /**
         * 起点坐标
         */
        readonly from: {
          /**
           * 纬度
           */
          readonly lat: number;
          /**
           * 经度
           */
          readonly lng: number;
        };
        /**
         * 	终点坐标
         */
        readonly to: {
          /**
           * 纬度
           */
          readonly lat: number;
          /**
           * 经度
           */
          readonly lng: number;
        };
        /**
         * 起点到终点的距离，单位：米，
         * 如果radius半径过小或者无法搜索到，则返回-1
         */
        readonly distance: number;
        /**
         * 表示从起点到终点的结合路况的时间，秒为单位
         * 注：步行方式不计算耗时，该值始终为0
         */
        readonly duration: number;
      }>;
    };
  };

  type ReverseGeocoderOptions = {
    /**
     *
     * 位置坐标
     * 1.String格式：lat<纬度>,lng<经度>（例：location: ‘39.984060,116.307520’）
     * 2.Object格式：
     * {
     *    latitude: 纬度,
     *    longitude: 经度
     * }
     * 默认是当前位置
     */
    location?: string | { latitude: number; longitude: number };
    /**
     * 输入的locations的坐标类型，可选值为[1,6]之间的整数，每个数字代表的类型说明：
     * 1 GPS坐标
     * 2 sogou经纬度
     * 3 baidu经纬度
     * 4 mapbar经纬度
     * 5 [默认]腾讯、google、高德坐标
     * 6 sogou墨卡托
     */
    coord_type?: 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * 是否返回周边POI列表：
     * 1.返回；0不返回(默认)
     */
    get_poi?: 1 | 0;
    /**
     * 用于控制Poi列表：
     * 1 poi_options=address_format=short返回短地址，缺省时返回长地址
     * 2 poi_options=radius=5000
     * 半径，取值范围 1-5000（米）
     * 3 poi_options=policy=1/2/3
     * 控制返回场景，
     * policy=1[默认] 以地标+主要的路+近距离poi为主，着力描述当前位置；
     * policy=2 到家场景：筛选合适收货的poi，并会细化收货地址，精确到楼栋；
     * policy=3 出行场景：过滤掉车辆不易到达的POI(如一些景区内POI)，
     * 增加道路出路口、交叉口、大区域出入口类POI，排序会根据真实API大用户的用户点击自动优化。
     */
    poi_options?: string;
    /**
     * 签名校验
     * 开启WebServiceAPI签名校验的必传参数，只需要传入生成的SK字符串即可，不需要进行MD5加密操作
     * 该参数适用于 jssdkv1.2
     */
    sig?: string;
  };

  type ReverseGeocoderResponse = {
    /**
     * 状态码，0为正常,
     * 310请求参数信息有误，
     * 311Key格式错误,
     * 306请求有护持信息请检查字符串,
     * 110请求来源未被授权
     */
    readonly status: number;
    /**
     * 状态说明，即对状态码status进行说明
     * 如：
     * status为0,message为"query ok",为正常,
     * status为310,message为"请求参数信息有误",
     * status为311,message为"key格式错误",
     * status为306,message为"请求有护持信息请检查字符串",
     * status为110,message为"请求来源未被授权"
     */
    readonly message: string;
    /**
     * 	逆地址解析结果
     */
    readonly result: {
      /**
       * 地址描述
       */
      readonly address: string;
      /**
       * 位置描述
       */
      readonly formatted_addresses?: {
        /**
         * 	经过腾讯地图优化过的描述方式，更具人性化特点
         */
        readonly recommend?: string;
        /**
         * 大致位置，可用于对位置的粗略描述
         */
        readonly rough?: string;
      };
      /**
       * 地址部件，address不满足需求时可自行拼接
       */
      readonly address_component: {
        /**
         * 国家
         */
        readonly nation: string;
        /**
         * 省
         */
        readonly province: string;
        /**
         * 市
         */
        readonly city: string;
        /**
         * 	区，可能为空字串
         */
        readonly district?: string;
        /**
         * 街道，可能为空字串
         */
        readonly street?: string;
        /**
         * 门牌，可能为空字串
         */
        readonly street_number?: string;
      };

      readonly ad_info?: {
        /**
         * 行政区划代码
         */
        readonly adcode: string;
        /**
         * 行政区划名称
         */
        readonly name: string;
        /**
         * 行政区划中心点坐标
         */
        readonly location: {
          /**
           * 纬度
           */
          readonly lat: number;
          /**
           * 经度
           */
          readonly lng: number;
        };
        /**
         * 国家
         */
        readonly nation: string;
        /**
         * 省/直辖市
         */
        readonly province: string;
        /**
         * 市/地级区 及同级行政区划
         */
        readonly city: string;
        /**
         * 区/县级市 及同级行政区划
         */
        readonly district?: string;
      };
      /**
       * 坐标相对位置参考
       */
      readonly address_reference?: {
        /**
         * 知名区域，如商圈或人们普遍认为有较高知名度的区域
         */
        readonly famous_area?: Area;
        /**
         * 乡镇街道
         */
        readonly town?: Area;
        /**
         * 一级地标，可识别性较强、规模较大的地点、小区等
         */
        readonly landmark_l1?: Area;
        /**
         * 二级地标，较一级地标更为精确，规模更小
         */
        readonly landmark_l2?: Area;
        /**
         * 街道
         */
        readonly street?: Area;
        /**
         * 门牌
         */
        readonly street_number?: Area;
        /**
         * 交叉路口
         */
        readonly crossroad?: Area;
        /**
         * 	水系
         */
        readonly water?: Area;
      };
      /**
       * POI数组，对象中每个子项为一个POI对象，返回的POI数量及页数可通过请求参数poi_options设置
       */
      readonly pois?: Array<{
        /**
         * POI唯一标识
         */
        readonly id?: string;
        /**
         * 	poi名称
         */
        readonly title?: string;
        /**
         * 地址
         */
        readonly address?: string;
        /**
         * POI分类
         */
        readonly category?: string;
        /**
         * 提示所述位置坐标
         */
        readonly location?: {
          /**
           * 纬度
           */
          readonly lat?: number;
          /**
           * 经度
           */
          readonly lng?: number;
        };
        /**
         * 该POI到逆地址解析传入的坐标的直线距离
         */
        readonly _distance?: number;
      }>;
    };
  };

  type Area = {
    /**
     * 名称/标题
     */
    readonly title?: string;
    /**
     * 坐标
     */
    readonly location?: {
      /**
       * 纬度
       */
      readonly lat?: number;
      /**
       * 经度
       */
      readonly lng?: number;
    };
    /**
     * 此参考位置到输入坐标的直线距离
     */
    readonly _distance?: number;
    /**
     * 此参考位置到输入坐标的方位关系，如：北、南、内
     */
    readonly _dir_desc?: string;
  };

  type GeocoderOptions = {
    /**
     * 地址（注：地址中请包含城市名称，否则会影响解析效果），
     * 如：‘北京市海淀区彩和坊路海淀西大街74号’
     */
    address: string;
    /**
     * 指定地址所属城市,如北京市
     * 该参数适用于 jssdkv1.1 jssdkv1.2
     */
    region?: string;
    /**
     * 签名校验
     * 开启WebServiceAPI签名校验的必传参数，只需要传入生成的SK字符串即可，不需要进行MD5加密操作
     * 该参数适用于 jssdkv1.2
     */
    sig?: string;
  };

  type GeocoderResponse = {
    /**
     * 状态码，0为正常,
     * 310请求参数信息有误，
     * 311Key格式错误,
     * 306请求有护持信息请检查字符串,
     * 110请求来源未被授权
     */
    readonly status: number;
    /**
     * 状态说明，即对状态码status进行说明
     * 如：
     * status为0,message为"query ok",为正常,
     * status为310,message为"请求参数信息有误",
     * status为311,message为"key格式错误",
     * status为306,message为"请求有护持信息请检查字符串",
     * status为110,message为"请求来源未被授权"
     */
    readonly message: string;
    /**
     * 	地址解析结果
     */
    readonly result: {
      /**
       * 解析到的坐标
       */
      readonly location: {
        /**
         * 纬度
         */
        readonly lat: number;
        /**
         * 经度
         */
        readonly lng: number;
      };
      /**
       * 解析后的地址部件
       */
      readonly address_components: {
        /**
         * 省
         */
        readonly province: string;
        /**
         * 市
         */
        readonly city: string;
        /**
         * 	区，可能为空字串
         */
        readonly district?: string;
        /**
         * 街道，可能为空字串
         */
        readonly street: string;
        /**
         * 门牌，可能为空字串
         */
        readonly street_number: string;
      };
      /**
       * 查询字符串与查询结果的文本相似度
       */
      readonly similarity?: number;
      /**
       * 误差距离，单位：米， 该值取决于输入地址的精确度；
       * 如address输入：海淀区北四环西路，因为地址所述范围比较大，因此会有千米级误差；
       * 而如：银科大厦这类具体的地址，返回的坐标就会相对精确；
       * 该值为 -1 时，说明输入地址为过于模糊，仅能精确到市区级。
       */
      readonly deviation: number;
      /**
       * 可信度参考：值范围 1 低可信 - 10 高可信
       * 我们根据用户输入地址的准确程度，在解析过程中，将解析结果的可信度(质量)，由低到高，
       * 分为1 - 10级，该值>=7时，解析结果较为准确，<7时，会存各类不可靠因素，
       * 开发者可根据自己的实际使用场景，对于解析质量的实际要求，进行参考。
       */
      readonly reliability: number;
    };
  };

  type CityResponse = {
    /**
     * 状态码，0为正常,
     * 310请求参数信息有误，
     * 311Key格式错误,
     * 306请求有护持信息请检查字符串,
     * 110请求来源未被授权
     */
    readonly status: number;
    /**
     * 状态说明，即对状态码status进行说明
     * 如：
     * status为0,message为"query ok",为正常,
     * status为310,message为"请求参数信息有误",
     * status为311,message为"key格式错误",
     * status为306,message为"请求有护持信息请检查字符串",
     * status为110,message为"请求来源未被授权"
     */
    readonly message: string;
    /**
     * 结果数组，第0项，代表一级行政区划，第1项代表二级行政区划，
     * 以此类推；使用getchildren接口时，仅为指定父级行政区划的子级
     */
    readonly result: Array<{
      /**
       * 行政区划唯一标识
       */
      readonly id: number;
      /**
       * 简称，如“内蒙古”
       */
      readonly name?: string;
      /**
       * 	全称，如“内蒙古自治区”
       */
      readonly fullname: string;
      /**
       * 中心点坐标
       */
      readonly location: {
        /**
         * 纬度
         */
        readonly lat: number;
        /**
         * 	经度
         */
        readonly lng: number;
      };
      /**
       * 行政区划拼音，每一下标为一个字的全拼，如：[“nei”,“meng”,“gu”]
       */
      readonly pinyin?: Array<string>;
      /**
       * 子级行政区划在下级数组中的下标位置
       */
      readonly cidx?: Array<string>;
    }>;
  };

  type DistrictResponse = CityResponse;

  export {
    ConstructorOptions,
    SearchOptions,
    SearchResponse,
    SuggestionOptions,
    SuggestionResponse,
    CalculateDistanceOptions,
    CalculateDistanceResponse,
    ReverseGeocoderOptions,
    ReverseGeocoderResponse,
    GeocoderOptions,
    GeocoderResponse,
    CityResponse,
    DistrictResponse,
  };
}
declare class QQMapWX {
  /**
   * 构造器
   * @param options
   */
  constructor(options: ConstructorOptions);

  /**
   * 地点搜索，搜索周边poi，比如：“酒店” “餐饮” “娱乐” “学校” 等等
   * https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/methodSearch
   * @param options
   * @param success
   * @param fail
   * @param complete
   */
  search(
    options: QQMapWxNamespace.SearchOptions,
    success?: (res: QQMapWxNamespace.SearchResponse) => void,
    fail?: (res: QQMapWxNamespace.SearchResponse) => void,
    complete?: (res: QQMapWxNamespace.SearchResponse) => void
  ): void;

  /**
   *
   * 用于获取输入关键字的补完与提示，帮助用户快速输入
   * 注：坐标系采用gcj02坐标系
   * https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/methodGetsuggestion
   * @param options
   * @param success
   * @param fail
   * @param complete
   */
  getSuggestion(
    options: QQMapWxNamespace.SuggestionOptions,
    success?: (res: QQMapWxNamespace.SuggestionResponse) => void,
    fail?: (res: QQMapWxNamespace.SuggestionResponse) => void,
    complete?: (res: QQMapWxNamespace.SuggestionResponse) => void
  ): void;

  /**
   * 本接口提供由坐标到坐标所在位置的文字描述的转换，输入坐标返回地理位置信息和附近poi列表。
   * 注：坐标系采用gcj02坐标系
   * https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/methodReverseGeocoder
   * @param options
   * @param success
   * @param fail
   * @param complete
   */
  reverseGeocoder(
    options: QQMapWxNamespace.ReverseGeocoderOptions,
    success?: (res: QQMapWxNamespace.ReverseGeocoderResponse) => void,
    fail?: (res: QQMapWxNamespace.ReverseGeocoderResponse) => void,
    complete?: (res: QQMapWxNamespace.ReverseGeocoderResponse) => void
  ): void;

  /**
   * 提供由地址描述到所述位置坐标的转换，与逆地址解析reverseGeocoder()的过程正好相反。
   * 注：坐标系采用gcj02坐标系
   * @param options
   * @param success
   * @param fail
   * @param complete
   */
  geocoder(
    options: QQMapWxNamespace.GeocoderOptions,
    success?: (res: QQMapWxNamespace.GeocoderResponse) => void,
    fail?: (res: QQMapWxNamespace.GeocoderResponse) => void,
    complete?: (res: QQMapWxNamespace.GeocoderResponse) => void
  ): void;

  /**
   * 计算一个点到多点的步行、驾车距离。
   * 注：坐标系采用gcj02坐标系
   * https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/methodCalculatedistance
   * @param options
   * @param success
   * @param fail
   * @param complete
   */
  calculateDistance(
    options: QQMapWxNamespace.SuggestionOptions,
    success?: (res: QQMapWxNamespace.SuggestionResponse) => void,
    fail?: (res: QQMapWxNamespace.SuggestionResponse) => void,
    complete?: (res: QQMapWxNamespace.SuggestionResponse) => void
  ): void;

  /**
   * 获取全国城市列表数据。
   * 注：坐标系采用gcj02坐标系
   * @param options
   * @param success
   * @param fail
   * @param complete
   */
  getCityList(
    options: { sig?: string },
    success?: (res: QQMapWxNamespace.CityResponse) => void,
    fail?: (res: QQMapWxNamespace.CityResponse) => void,
    complete?: (res: QQMapWxNamespace.CityResponse) => void
  ): void;

  /**
   * 通过城市ID返回城市下的区县。
   * 注：坐标系采用gcj02坐标系
   * @param options
   * @param success
   * @param fail
   * @param complete
   */
  getDistrictByCityId(
    options: { id: string; sig?: string },
    success?: (res: QQMapWxNamespace.DistrictResponse) => void,
    fail?: (res: QQMapWxNamespace.DistrictResponse) => void,
    complete?: (res: QQMapWxNamespace.DistrictResponse) => void
  ): void;
}

export { QQMapWX, QQMapWxNamespace };
