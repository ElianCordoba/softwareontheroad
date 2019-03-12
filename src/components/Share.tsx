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


const Share: React.FunctionComponent<ShareProps> = ({ socialConfig, tags }) => (
	<>
	<ShareSocialTitle> Share with your developer fellows !  </ShareSocialTitle>
	<ShareSocialContainer>
		<span css={css`cursor: pointer;`} >
			<FacebookShareButton url={socialConfig.config.url} >
				<FacebookIcon size={64} />
					<SocialNetworkName> Facebook </SocialNetworkName>
			</FacebookShareButton>
		</span>
		<span css={css`cursor: pointer;`} >
			<TwitterShareButton url={socialConfig.config.url} title={socialConfig.config.title} via={socialConfig.twitterHandle.split('@').join('')} hashtags={tags} >
				<TwitterIcon size={64}  />
				<SocialNetworkName> Twitter </SocialNetworkName>
			</TwitterShareButton>
		</span>
		<span css={css`cursor: pointer;`} >
			<RedditShareButton url={socialConfig.config.url} title={socialConfig.config.title} >
				<RedditIcon size={64}  />
					<SocialNetworkName> Reddit </SocialNetworkName>
			</RedditShareButton>
		</span>
	</ShareSocialContainer>
	</>
);

Share.defaultProps = {
	tags: [],
};

export default Share;