// A collection of assets created using Path2D()


function roundedRect(x, y, w, h, r) {
	var rr = new Path2D();
	rr.moveTo(x + r, y);
	rr.arcTo(x + w, y, x + w, y + r, r);
	rr.arcTo(x + w, y + h, x + w - r, y + h, r);
	rr.arcTo(x, y + h, x, y + h - r, r);
	rr.arcTo(x, y, x + r, y, r);
	return rr;
}


function roundedCorners(x, y, w, h, r) {
	// Path2D.arc() methods got long so removed spaces
	var rc = new Path2D();
	rc.arc(x+r, y+r, r, Math.PI, Math.PI * 1.5, false);
	rc.moveTo(x + w - r, y);
	rc.arc(x+w-r, y+r, r, Math.PI * 1.5, Math.PI * 2, false);
	rc.moveTo(x + w, y + h - r);
	rc.arc(x+w-r, y+h-r, r, 0, Math.PI / 2, false);
	rc.moveTo(x + r, y + h);
	rc.arc(x+r, y+h-r, r, Math.PI / 2, Math.PI, false);
	return rc;
}
