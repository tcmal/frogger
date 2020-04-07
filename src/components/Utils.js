import React from "react";
import { observer } from "mobx-react";

export const LoadableWrapper = observer(({ loadable, children, className }) => {
	if (loadable.requestInProgress) {
		return <p className="loading">Loading...</p>;
	} else if (loadable.error) {
		return <p className="error">{loadable.error}</p>
	} else {
		return <div className={className}>{children}</div>;
	}
});

export const PaginationWrapper = observer(({ pagable, children, className="", showRefresh=false }) => (
	<section className="paginationWrapper">
		{showRefresh ? <a href="#" className="refresh" onClick={pagable.clear}>Refresh</a> : ''}

		<LoadableWrapper loadable={pagable} className={className}>
			{children}
		</LoadableWrapper>

		{pagable.hasPrev ? <button onClick={pagable.loadPrevPage} className="btn prev">Previous</button> : ''}
		{pagable.hasNext ? <button onClick={pagable.loadNextPage} className="btn next">Next</button> : ''}
	</section>
));