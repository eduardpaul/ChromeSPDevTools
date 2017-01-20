import * as React from 'react';
import { IconName } from 'office-ui-fabric-react/lib/Icon';
import { getRTL } from 'office-ui-fabric-react/lib/utilities/rtl';
import { ContextualMenu, DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { IconLink } from './../../common/iconLink';

export class ContextualMenuBasicExample extends React.Component<any, any> {

    constructor() {
        super();
        this.state = {
            isContextMenuVisible: false,
            showCallout: false
        };
        this._onClick = this._onClick.bind(this);
        this._onDismiss = this._onDismiss.bind(this);
    }

    public render() {
        let { showCallout } = this.state;

        return (
            <div>
                <Button buttonType={ ButtonType.icon } icon='More' title='More' ariaLabel='More' onClick={this._onClick} id='ContextualMenuButton1'></Button>
                {this.state.isContextMenuVisible ? (
                    <ContextualMenu
                        shouldFocusOnMount={true}
                        target={this.state.target}
                        onDismiss={this._onDismiss}
                        directionalHint={getRTL() ? DirectionalHint.bottomRightEdge : DirectionalHint.bottomLeftEdge}
                        items={
                            [
                                {
                                    key: 'newItem',
                                    iconProps: {
                                        iconName: IconName.Add
                                    },
                                    subMenuProps: {
                                        items: [
                                            {
                                                key: 'emailMessage',
                                                name: 'Email message',
                                                title: 'Create an email'
                                            },
                                            {
                                                key: 'calendarEvent',
                                                name: 'Calendar event',
                                                title: 'Create a calendar event',
                                            }
                                        ],
                                    },
                                    name: 'New'
                                },
                                {
                                    key: 'upload',
                                    onClick: () => {
                                        this.setState({ showCallout: true });
                                    },
                                    iconProps: {
                                        iconName: IconName.Upload,
                                        style: {
                                            color: 'salmon'
                                        }
                                    },
                                    name: 'Upload (Custom Color)',
                                    title: 'Upload a file'
                                },
                                {
                                    key: 'divider_1',
                                    name: '-',
                                },
                                {
                                    key: 'rename',
                                    name: 'Rename'
                                },
                                {
                                    key: 'properties',
                                    name: 'Properties'
                                },
                                {
                                    key: 'disabled',
                                    name: 'Disabled item',
                                    disabled: true,
                                },
                                {
                                    key: 'divider_2',
                                    name: '-',
                                },
                                {
                                    key: 'share',
                                    iconProps: {
                                        iconName: IconName.Share
                                    },
                                    subMenuProps: {
                                        items: [
                                            {
                                                key: 'sharetoemail',
                                                name: 'Share to Email',
                                                iconProps: {
                                                    iconName: IconName.Mail
                                                },
                                            },
                                            {
                                                key: 'sharetofacebook',
                                                name: 'Share to Facebook',
                                            },
                                            {
                                                key: 'sharetotwitter',
                                                name: 'Share to Twitter',
                                                iconProps: {
                                                    iconName: IconName.Share
                                                },
                                                subMenuProps: {
                                                    items: [
                                                        {
                                                            key: 'sharetoemail_1',
                                                            name: 'Share to Email',
                                                            title: 'Share to Email',
                                                            iconProps: {
                                                                iconName: IconName.Mail
                                                            },
                                                        },
                                                        {
                                                            key: 'sharetofacebook_1',
                                                            name: 'Share to Facebook',
                                                            title: 'Share to Facebook',
                                                        },
                                                        {
                                                            key: 'sharetotwitter_1',
                                                            name: 'Share to Twitter',
                                                            title: 'Share to Twitter',
                                                            iconProps: {
                                                                iconName: IconName.Share
                                                            }
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                    name: 'Share'
                                },
                                {
                                    key: 'print',
                                    iconProps: {
                                        iconName: IconName.Print
                                    },
                                    name: 'Print'
                                },
                                {
                                    key: 'music',
                                    iconProps: {
                                        iconName: IconName.MusicInCollectionFill
                                    },
                                    name: 'Music',
                                },
                                {
                                    key: 'divider_3',
                                    name: '-',
                                },
                                {
                                    key: 'Bing',
                                    name: 'Go to Bing',
                                    href: 'http://www.bing.com'
                                },
                            ]
                        }
                        />) : (null)}

                {showCallout && (
                    <Callout
                        setInitialFocus={true}
                        onDismiss={() => this.setState({ showCallout: false })}
                        >
                        <Button onClick={() => this.setState({ showCallout: false })}>Hello world</Button>
                    </Callout>
                )}
            </div>
        );
    }

    private _onClick(event: React.MouseEvent<any>) {
        this.setState({ target: event.target, isContextMenuVisible: !this.state.isContextMenuVisible });
        console.log(this.state.isContextMenuVisible);
        return false;
    }

    private _onDismiss(event: any) {
        this.setState({ isContextMenuVisible: false });
    }
}