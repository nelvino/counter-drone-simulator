import type React from 'react'

interface FollowDroneCheckboxProps {
	followDrone: boolean
	setFollowDrone: (followDrone: boolean) => void
}

const checkboxStyles: React.CSSProperties = {
	position: 'absolute',
	top: 20,
	right: 10,
	zIndex: 1000,
	backgroundColor: 'white',
	padding: 5,
}

const FollowDroneCheckbox = ({
	followDrone,
	setFollowDrone,
}: FollowDroneCheckboxProps): JSX.Element => {
	return (
		<div style={checkboxStyles}>
			<label>
				<input
					type='checkbox'
					checked={followDrone}
					onChange={() => setFollowDrone(!followDrone)}
				/>
				Follow Drone
			</label>
		</div>
	)
}

export default FollowDroneCheckbox
