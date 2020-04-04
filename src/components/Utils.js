import React from "react";
import { observer } from "mobx-react";

export const LoadableWrapper = observer(({ loadable, children }) => {
	if (loadable.requestInProgress) {
		return <p className="loading">Loading...</p>;
	} else if (loadable.error) {
		return <p className="error">{loadable.error}</p>
	} else {
		return <div>{children}</div>;
	}
});

export const PaginationWrapper = observer(({ pagable, children }) => (
	<section className="paginationWrapper">
		
		<LoadableWrapper loadable={pagable}>
			{children}
		</LoadableWrapper>

		{pagable.hasPrev ? <button onClick={pagable.loadPrevPage} className="btn prev">Previous</button> : ''}
		<button onClick={pagable.loadNextPage} className="btn next">Next</button>
	</section>
));