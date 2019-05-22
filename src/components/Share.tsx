import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
	FacebookIcon,
	TwitterIcon,
	RedditIcon,
	FacebookShareButton,
	TwitterShareButton,
	RedditShareButton,
} from 'react-share';

export interface ShareProps {
	socialConfig: {
		twitterHandle: string;
		config: {
			url: string;
			title: string;
		};
	}
	tags: string[];
}

const ShareSocialContainer = styled.div`
	display: flex;
  justify-content: space-around;
	align-items: center;
	margin: 0 auto;
  padding: 3vw 6vw 3vw 6vw;
	max-width: 840px;
`

const ShareSocialTitle = styled.h1`
justify-content: space-around;
display: flex;
align-items: center;
`

const SocialNetworkName = styled.p`
justify-content: space-around;
display: flex;
align-items: center;
`

const ShareSocialItem = styled.div`
	cursor: pointer;
	transition: transform .2s;
	transition-timing-function: ease-out;
  :hover {
    transform: scale(1.10);
	}
	svg {
		-webkit-box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);
		-moz-box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);
		box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);
		border-radius: 5px;
	}
`

const Share: React.FunctionComponent<ShareProps> = ({ socialConfig, tags }) => (
	<>
	<ShareSocialTitle> Share with your developer fellows !  </ShareSocialTitle>
	<ShareSocialContainer>
		<ShareSocialItem >
			<FacebookShareButton url={socialConfig.config.url} >
				<FacebookIcon size={64}/>
					<SocialNetworkName> Facebook </SocialNetworkName>
			</FacebookShareButton>
		</ShareSocialItem>
		<ShareSocialItem >
			<TwitterShareButton url={socialConfig.config.url} title={socialConfig.config.title} via={socialConfig.twitterHandle.split('@').join('')} hashtags={tags} >
				<TwitterIcon size={64}  />
				<SocialNetworkName> Twitter </SocialNetworkName>
			</TwitterShareButton>
		</ShareSocialItem>
		<ShareSocialItem >
			<RedditShareButton url={socialConfig.config.url} title={socialConfig.config.title} >
				<RedditIcon size={64}  />
					<SocialNetworkName> Reddit </SocialNetworkName>
			</RedditShareButton>
		</ShareSocialItem>
	</ShareSocialContainer>
	</>
);

Share.defaultProps = {
	tags: [],
};

export default Share;