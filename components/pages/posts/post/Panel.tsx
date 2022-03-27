import * as React from 'react';

import { faMessage, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from '@components/pages/posts/post/shared/PanelButton';

export const Panel = () => {
	return (
		<div className="w-full flex gap-2 justify-evenly border-t-2 border-t-dark-100 p-2">
			<PanelButton title="Like" icon={faThumbsUp} callback={() => console.log('Like action..')} />
			<PanelButton title="Comment" icon={faMessage} callback={() => console.log('Comment action..')} />
			<PanelButton title="Share" icon={faShare} callback={() => console.log('Share action..')} />
		</div>
	);
};
