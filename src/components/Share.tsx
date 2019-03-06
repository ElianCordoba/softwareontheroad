import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
	FacebookIcon,
	TwitterIcon,
	GooglePlusIcon,
	LinkedinIcon,
	RedditIcon,
	FacebookShareButton,
	GooglePlusShareButton,
	LinkedinShareButton,
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

const Share: React.FunctionComponent<ShareProps> = ({ socialConfig, tags }) => (
	<ShareSocialContainer>
		<h3> Share: </h3> 
		<span css={css`cursor: pointer;`} >
			<FacebookShareButton url={socialConfig.config.url} >
				<FacebookIcon size={64} />
			</FacebookShareButton>
		</span>
		<span css={css`cursor: pointer;`} >
			<TwitterShareButton url={socialConfig.config.url} title={socialConfig.config.title} via={socialConfig.twitterHandle.split('@').join('')} hashtags={tags} >
				<TwitterIcon size={64}  />
			</TwitterShareButton>
		</span>
		<span css={css`cursor: pointer;`} >
			<GooglePlusShareButton url={socialConfig.config.url} >
				<GooglePlusIcon size={64} />
			</GooglePlusShareButton>
		</span>
		<span css={css`cursor: pointer;`} >
			<LinkedinShareButton url={socialConfig.config.url} title={socialConfig.config.title} >
				<LinkedinIcon size={64}  />
			</LinkedinShareButton>
		</span>
		<span css={css`cursor: pointer;`} >
			<RedditShareButton url={socialConfig.config.url} title={socialConfig.config.title} >
				<RedditIcon size={64}  />
			</RedditShareButton>
		</span>
	</ShareSocialContainer>
);

Share.defaultProps = {
	tags: [],
};

export default Share;