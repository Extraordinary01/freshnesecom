<template>
	<div class="custom-file-input">
		<div class="custom-file-input__container">
			<div class="custom-file-input__wrapper">
				<div class="custom-file-input__image">
					<img src="" class="custom-file-input__img" alt="" />
				</div>
				<div class="custom-file-input__content">
					<div class="custom-file-input__icon">
						<img src="@/assets/icons/add-file.svg" />
					</div>
					<div class="custom-file-input__text">No file choosen yet</div>
				</div>
				<div class="custom-file-input__cancel" @click="resetImg()">
					<img src="@/assets/icons/close.svg" />
				</div>
				<div class="custom-file-input__file-name">File name here</div>
			</div>
			<input
				type="file"
				:name="name"
				id="default-btn"
				@change="onChangeFile"
				hidden
			/>
			<button id="custom-btn" @click.prevent="btnActive()">
				Choose a file
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			name: String,
			modelValue: [String, File],
		},
		methods: {
			onChangeFile(event) {
				const file = event.target.files[0];
				let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
				if (file) {
					const reader = new FileReader();
					reader.onload = () => {
						const result = reader.result;
						const img = document.querySelector(".custom-file-input__img");
						img.src = result;
					};
					reader.readAsDataURL(file);
					const wrapper = document.querySelector(".custom-file-input__wrapper");
					if (!wrapper.classList.contains("active")) {
						wrapper.classList.toggle("active");
					}
				}
				if (event.target.value) {
					const fileName = document.querySelector(
						".custom-file-input__file-name"
					);
					fileName.textContent = event.target.value.match(regExp);
				}
				this.$emit("update:modelValue", event.target.files[0]);
			},
			btnActive() {
				const defaultBtn = document.querySelector("#default-btn");
				defaultBtn.click();
			},
			resetImg() {
				const img = document.querySelector(".custom-file-input__img");
				img.src = "";
				const wrapper = document.querySelector(".custom-file-input__wrapper");
				wrapper.classList.toggle("active");
			},
		},
		mounted() {
			if (this.$props.modelValue) {
				const img = document.querySelector(".custom-file-input__img");
				let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
				img.src = this.modelValue;
				const fileName = document.querySelector(
					".custom-file-input__file-name"
				);
				fileName.textContent = this.modelValue.match(regExp);
				const wrapper = document.querySelector(".custom-file-input__wrapper");
				wrapper.classList.toggle("active");
			}
		},
		beforeUnmount() {
			const wrapper = document.querySelector(".custom-file-input__wrapper");
			if (wrapper.classList.contains("active")) {
				wrapper.classList.toggle("active");
			}
		},
	};
</script>

<style lang="scss">
	.custom-file-input {
		display: grid;
		height: 350px;
		width: 100%;
		place-items: center;
		text-align: center;
		&__container {
			height: 100%;
			width: 100%;
		}
		&__container &__wrapper {
			position: relative;
			height: 300px;
			width: 100%;
			border: 2px dashed #c2cdda;
			border-radius: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&__wrapper &__image {
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			& img {
				width: 100%;
				height: 100%;
				border-radius: 12px;
				object-fit: cover;
			}
		}
		&__wrapper &__icon {
			filter: invert(52%) sepia(15%) saturate(1496%) hue-rotate(47deg)
				brightness(99%) contrast(86%);
		}
		&__wrapper &__text {
			font-size: 15px;
			font-weight: 500;
			color: #5b5b7b;
			font-family: "Poppins";
		}
		&__wrapper &__cancel {
			position: absolute;
			display: none;
			right: 10px;
			top: 10px;
			cursor: pointer;
			filter: invert(52%) sepia(15%) saturate(1496%) hue-rotate(47deg)
				brightness(99%) contrast(86%);
		}
		&__wrapper &__file-name {
			position: absolute;
			bottom: 0;
			display: none;
			background: #6a983c;
			width: 100%;
			color: #fff;
			font-family: "Poppins";
			padding: 8px 0;
			border-bottom-left-radius: 12px;
			border-bottom-right-radius: 12px;
		}
		&__wrapper.active {
			border: none;
			&:hover .custom-file-input__cancel,
			&:hover .custom-file-input__file-name {
				display: block;
			}
			& .custom-file-input__icon {
				display: none;
			}
		}
		&__wrapper &__cancel:hover {
			filter: invert(50%) sepia(98%) saturate(4591%) hue-rotate(342deg)
				brightness(97%) contrast(86%);
		}
		&__container #custom-btn {
			margin-top: 30px;
			width: 100%;
			height: 30px;
			display: block;
			outline: none;
			border: none;
			background: #6a983c;
			border-radius: 25px;
			color: #fff;
			font-size: 16px;
			letter-spacing: 0.8px;
			font-family: "Poppins";
			cursor: pointer;
		}
	}
	@media (max-width: 700px) {
		.custom-file-input {
			width: 80vw;
			margin: 0 auto;
		}
	}
	.active-input {
		.text-label {
			color: #6a983c;
		}
	}
	.error-input {
		.text-label {
			color: red;
		}
	}
</style>
