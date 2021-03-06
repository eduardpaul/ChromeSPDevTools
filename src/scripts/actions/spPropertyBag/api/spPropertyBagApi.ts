import ApiBase from './../../common/apiBase';
import { IProperty } from '../interfaces/spPropertyBagInterfaces'
import { constants } from './../constants/constants'

export default class SpPropertyBagApi extends ApiBase {
    public decodeSpCharacters(strToDecode: string): string {
        strToDecode = strToDecode.replace(constants.PROPERTY_REST_PREFIX, constants.EMPTY_STRING);
        var matchesArray = strToDecode.match(constants.PROPERTY_REST_DECODE_REGEX);
        if (!!matchesArray) {
            matchesArray.forEach(function (str) {
                var decoded = decodeURIComponent(str.replace(constants.PROPERTY_REST_UNDERSCORE_REGEX, constants.EMPTY_STRING).replace(constants.PROPERTY_REST_UNDERSCORE_PREFIX_REGEX, constants.PERCET_STRING));
                strToDecode = strToDecode.replace(str, decoded);
            });
        }
        return strToDecode;
    }
    public getProperties(): Promise<Array<IProperty>> {
        return new Promise((resolve, reject) => {
            this.getRequest(`${_spPageContextInfo.webAbsoluteUrl}${constants.PROPERTY_REST_REQUEST_URL}`).then((response:any) =>{
                let props: Array<IProperty> = [];
                let rawData = response.data;
                for (let prop in rawData) {
                    let propVal: any = rawData[prop];
                    if (typeof (propVal) === constants.STRING_STRING) {
                        props.push({
                            key: this.decodeSpCharacters(prop),
                            value: propVal.replace(constants.PROPERTY_REST_DOUBLEQUOTES_REGEX, constants.PROPERTY_REST_DOUBLEQUOTES)
                        });
                    }
                }
                resolve(props);
            }).catch((error:any) =>{
                reject(error);
            });
        });
    }

    public deleteProperty(property: IProperty): Promise<IProperty> {
        return this.setProperty(Object.assign({}, property, { value: null }));
    }

    public createProperty(property: IProperty): Promise<IProperty> {
        return this.setProperty(property);
    }

    public updateProperty(property: IProperty): Promise<IProperty> {
        return this.setProperty(property);
    }

    private setProperty(property: IProperty): Promise<IProperty> {
        return new Promise((resolve, reject) => {
            this.reject = reject;
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const allProperties = web.get_allProperties();

            allProperties.set_item(property.key, property.value);

            web.update();

            ctx.executeQueryAsync((sender: any, err: any) => {
                resolve(property);
            }, this.requestErrorEventHandler.bind(this));
        });
    }
}