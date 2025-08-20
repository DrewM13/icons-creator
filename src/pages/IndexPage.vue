<template>
  <q-page class="column items-center justify-evenly q-py-md">
    <q-card class="row items-center col-12 q-mx-md items-stretch" dense flat bordered>
      <q-card-section class="justify-center items-center column col-12">
        <span class="col text-h6"> Criador de ícones </span>
        <q-img
          src="/icon-generator.png"
          spinner-color="primary"
          spinner-size="30px"
          height="100px"
          width="130px"
          class="col-12"
        />
      </q-card-section>
      <q-card-section class="col-sm-12 col-md-6 col-lg-6 flex">
        <q-card class="fit" dense flat bordered>
          <q-card-section>
            <div class="row q-pt-sm">
              <div
                class="col row items-center justify-center rounded-borders dropFile"
                @dragover.prevent
                @drop.prevent="handleDrop"
                @click="openFileDialog"
              >
                <div>
                  <div class="column q-px-md">
                    <div class="col-auto text-center q-pb-sm">
                      <q-icon name="fas fa-upload" size="sm" />
                    </div>
                    <div class="col">
                      Arraste e solte sua imagem aqui ou
                      <span class="text-blue cursor-pointer"
                        >clique aqui para selecionar
                        <input
                          ref="fileInput"
                          type="file"
                          accept="image/jpeg, image/png, image/jpg"
                          class="hidden"
                          @change="handleFileChange"
                      /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-list bordered class="rounded-borders">
              <q-item class="q-gutter-sm column">
                <q-item-section>
                  <q-input
                    v-model="objIcon.name"
                    label="Nome"
                    :disable="dontHasImage"
                    :rules="[
                      (name) =>
                        !name ||
                        validateName(name) ||
                        'Não é permitido caracteres especiais, exceto  hífens e sublinhados',
                    ]"
                    outlined
                    dense
                    hide-bottom-space
                  />
                </q-item-section>
                <q-item-section>
                  <q-select
                    v-model="objIcon.animation"
                    label="Animação"
                    outlined
                    dense
                    map-options
                    emit-value
                    :options="optionsAnimation"
                    :disable="dontHasImage"
                    @update:model-value="(value) => resetSpeedAnimation(value)"
                  />
                </q-item-section>
                <q-item-section v-if="hasAnimation">
                  <q-input
                    v-model.number="objIcon.animationSpeed"
                    mask="###"
                    @blur="setSpeedAnimation()"
                    hint="Quanto maior, mais lenta a animação"
                    label="Velocidade da Animação"
                    outlined
                    dense
                  />
                </q-item-section>
                <q-item-section class="border-section q-px-md q-pt-sm">
                  <div>Nível de arredondamento da borda</div>
                  <q-slider
                    v-model="objIcon.borderRadius"
                    :min="0"
                    :max="50"
                    label
                    :disable="dontHasImage"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section class="col-sm-12 col-md-6 col-lg-6 flex">
        <q-card class="column col fit justify-center items-center" dense flat bordered>
          <q-card-section class="col-auto text-h6 justify-center items-center row">
            Prévia do ícone
          </q-card-section>
          <q-separator spaced inset />
          <q-card-section class="col column q-gutter-md items-center justify-center row">
            <q-img
              :src="objIcon.imageBase64"
              :class="objIcon.animation"
              class="image-size"
              :style="imgStyle"
            />
            <q-btn
              v-if="!dontHasImage"
              color="primary"
              no-caps
              class="col-auto"
              dense
              outline
              icon="download"
              label="Baixar SVG"
              @click="downloadSVG(objIcon)"
            />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import notify from "src/hooks/notify";

type Icon = {
  name: string;
  animation: string;
  borderRadius: number;
  animationSpeed: number;
  repeatAnimation: string;
  imageBase64: string;
};

const fileInput = ref<HTMLInputElement | null>(null);
const objIcon = ref<Icon>({
  name: "",
  animation: "none",
  borderRadius: 0,
  imageBase64: "/no-image.svg",
  animationSpeed: 1,
  repeatAnimation: "once",
});
const optionsAnimation: Array<{ label: string; value: string }> = [
  { label: "Nenhuma", value: "none" },
  { label: "Spin", value: "spin" },
  { label: "Spin Reversa", value: "spin-reverse" },
  { label: "Bounce", value: "bounce" },
  { label: "Shake", value: "shake" },
  { label: "BeatFade", value: "beat-fade" },
  { label: "Beat", value: "beat" },
  { label: "Fade", value: "fade" },
  { label: "Spin Pulse", value: "spin-pulse" },
];
const isLoadingFile = ref<boolean>(false);
const dontHasImage = computed(
  (): boolean => objIcon.value.imageBase64 === "/no-image.svg"
);
const hasAnimation = computed((): boolean => objIcon.value.animation !== "none");
const imgStyle = computed((): string => {
  return `border-radius: ${objIcon.value.borderRadius}%; animation-duration: ${objIcon.value.animationSpeed}s; height: auto; max-width: 100%;`;
});
const { errorNotify } = notify();
const StyleSVG = computed((): string => {
  const cssProperties: Record<string, string> = {
    beat: `
    @keyframes beat {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
    .beat {
      animation: beat 1s infinite;
      transform-origin: 50% 50%
    }
  `,
    "beat-fade": `  
    @keyframes beat-fade {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.5;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
     .beat-fade {
      animation: beatFade 1s infinite;
      transform-origin: 50% 50%
    }
  `,
    fade: `
    @keyframes fade {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    .fade {
      animation: fade 1s infinite;
      transform-origin: 50% 50%
    }
  `,
    spin: `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .spin {
      animation: spin 2s linear infinite;
      transform-origin: 50% 50%
    }
  `,
    "spin-reverse": `
    @keyframes spin-reverse {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
    .spin-reverse {
      animation: spin-reverse 2s linear infinite;
      transform-origin: 50% 50%
    }
    
  `,
    "spin-pulse": `
    @keyframes spin-pulse {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .spin-pulse {
      animation: spin-pulse 2s linear infinite;
      transform-origin: 50% 50%
    }
  `,
    shake: `
    @keyframes shake {
      0% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-10px);
      }
      50% {
        transform: translateX(10px);
      }
      75% {
        transform: translateX(-10px);
      }
      100% {
        transform: translateX(0);
      }
    }
    .shake {
      animation: shake 0.5s infinite;
      transform-origin: 50% 50%
    }
  `,
    bounce: `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      60% { 
        transform: translateY(-15px);
      }
    }
    .bounce {
      animation: bounce 2s infinite;
      transform-origin: 50% 50%
    }
    `,
  };
  return `${cssProperties[objIcon.value.animation]} border-radius: ${
    objIcon.value.borderRadius
  }%; animation-duration: ${objIcon.value.animationSpeed}s`;
});

function generateSVG(): string {
  const rx: number = (objIcon.value.borderRadius / 50) * 32;
  const svg: string = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <clipPath id="rounded">
      <rect x="0" y="0" width="64" height="64" rx="${rx}" ry="${rx}" />
    </clipPath>
  </defs>
  <g class="${objIcon.value.animation}" style="animation-duration: ${objIcon.value.animationSpeed}s; height: auto; max-width: 100%;">
    <image href="${objIcon.value.imageBase64}" height="64" width="64" clip-path="url(#rounded)" />
  </g>
  <style>${StyleSVG.value}</style>
</svg>`;

  return svg;
}

function openFileDialog(): void {
  fileInput.value?.click();
}

function handleFileChange(event: Event): void {
  const input = event?.target as HTMLInputElement;
  const files: FileList | null = input?.files;
  if (files && files.length > 0) {
    const file: File = files[0] || new File([], "");
    if (file.size <= 40 * 1024 * 1024) {
      convertToBase64(file);
    } else {
      errorNotify("O tamanho do arquivo deve ser até 40MB");
    }
  }
}

function convertToBase64(file: File): void {
  isLoadingFile.value = true;
  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result as string;
    objIcon.value.imageBase64 = base64;
  };
  reader.onerror = (error) => {
    console.error("Erro ao converter para base64:", error);
  };
  reader.readAsDataURL(file);
}

function handleDrop(event: DragEvent): void {
  const file = event?.dataTransfer?.files[0];

  if (file) {
    convertToBase64(file);
  }
}

function setSpeedAnimation(): void {
  if (!objIcon.value.animationSpeed) {
    objIcon.value.animationSpeed = 1;
  }
}

function resetSpeedAnimation(value: string): void {
  if (value === "none") {
    objIcon.value.animationSpeed = 1;
  }
}

function downloadSVG(obj: Icon): void {
  if (obj.imageBase64) {
    const svg = generateSVG();
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${obj.name}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

function validateName(name: string): boolean {
  const regexToValidateName = /^[A-Za-z][A-Za-z0-9_-]*$/;
  return regexToValidateName.test(name);
}
</script>
