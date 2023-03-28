const hadler = (io: any, socket: any) => {
	const createdMessage = (msg: any) => {
		socket.broadcast.emit("newIncomingMessage", msg);
	};

	socket.on("createdMessage", createdMessage);
};

export default hadler