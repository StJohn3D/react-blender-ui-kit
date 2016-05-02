export default (name = '', length = 8, caps = true,
  lowercase = true, digits = true, special = false, time = false) => {

    name = name ? name + '_' : '';
  const capsString = caps ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
	const lowercaseString = lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '';
	const digitsString = digits ? '0123456789' : '';
	const specialString = special ? '!@#$%&?' : '';
	const timeString = time ? '_' + String(Date.now()) : '';

  const possible = capsString + lowercaseString + digitsString + specialString;
	let id = '';
	while ( id.length < length ) {
		id += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return name + id + timeString;
}
