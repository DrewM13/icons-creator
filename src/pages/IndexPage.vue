<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="row" dense flat bordered>
      <q-card-section>
        <q-card dense flat bordered class='col-6'>
          <q-card-section class="text-h6 justify-center items-center row">
            <q-icon name="image" size="50px" class="text-primary" />

            Criador de ícones
          </q-card-section>
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
                      <q-icon name="fas fa-upload" size="md" />
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
                  <q-input v-model="objIcon.name" label="Nome" outlined dense />
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
                  />
                </q-item-section>
                  <q-item-section>
                  <q-input v-model.number="objIcon.animationSpeed" mask='###' label="Velocidade da Animação" outlined dense />
                </q-item-section>
                <q-item-section class="border-section q-px-md q-pt-sm">
                  <div>Nível de arredondamento da borda</div>
                  <q-slider v-model="objIcon.borderRadius" :min="0" :max="50" label />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section>
        <q-card class="full-width full-height column col-6" dense flat bordered>
          <q-card-section class="col-auto text-h6 justify-center items-center row">
            Prévia do ícone
          </q-card-section>
          <q-separator spaced inset />
          <q-card-section class="col column q-gutter-sm">
            <div class="col items-center justify-center row">
            <q-img
              :src="objIcon.imageBase64"
              :class="objIcon.animation"
              class=" "
              :style="`border-radius: ${objIcon.borderRadius}%; animation-duration: ${objIcon.animationSpeed}s;`"
            />
            </div>
            <q-btn v-if="objIcon.svgContent" color="primary" no-caps class='col-auto' dense outline icon="download" label="Baixar SVG" @click="downloadSVG(objIcon.svgContent)" />
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section class="col-12 items-center justify-center">
        <q-card  dense flat bordered class="row">
        <q-card-section>
          <q-btn color="primary" icon="check" label="Gerar código" @click="generateCode" />
        </q-card-section>
        <q-card-section class='col-6'>
        {{cssPropertiesString}}
        </q-card-section> 
        </q-card>
        
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

type Icon = {
  name: string;
  animation: string;
  borderRadius: number;
  animationSpeed: number;
  repeatAnimation: string;
  svgContent: string;
  imageBase64: string | ArrayBuffer;
};

const fileInput = ref<HTMLInputElement | null>(null);
const objIcon = ref<Icon>({
  name: "",
  animation: "none",
  borderRadius: 0,
  imageBase64: "",
  animationSpeed: 1,
  repeatAnimation: 'once',
  svgContent: ''
});
const optionsAnimation: Array<{ label: string; value: string }> = [
  { label: "Nenhuma", value: "none" },
  { label: 'Spin', value: 'spin' },
  { label: 'Spin Reversa', value: 'spin-reverse' },
  { label: 'Bounce', value: 'bounce' },
  { label: 'Shake', value: 'shake' },
  { label: 'BeatFade', value: 'beat-fade' },
  { label: 'Beat', value: 'beat' },
  { label: 'Fade', value: 'fade' },
  { label: 'Spin Pulse', value: 'spin-pulse' },
];
const isLoadingFile = ref<boolean>(false);

const cssPropertiesString = ref<string>("");

function generateCode():void {
  const cssProperties = {
  none:`
    border-radius: ${objIcon.value.borderRadius}%; animation-duration: ${objIcon.value.animationSpeed}s
  `,
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
    }
    border-radius: ${objIcon.value.borderRadius}%; animation-duration: ${objIcon.value.animationSpeed}s
  `,
  'beat-fade': `  
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
    }
    border-radius: ${objIcon.value.borderRadius}%; animation-duration: ${objIcon.value.animationSpeed}s
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
    }
    border-radius: ${objIcon.value.borderRadius}%; animation-duration: ${objIcon.value.animationSpeed}s
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
    }
    border-radius: ${objIcon.value.borderRadius}%; animation-duration: ${objIcon.value.animationSpeed}s
  `,
  'spin-reverse': `
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
    }
    border-radius: ${objIcon.value.borderRadius}%; animation-duration: ${objIcon.value.animationSpeed}s
  `,
  'spin-pulse': `
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
    }
    border-radius: ${objIcon.value.borderRadius}%; animation-duration: ${objIcon.value.animationSpeed}s
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
    }
    border-radius: ${objIcon.value.borderRadius}%; animation-duration: ${objIcon.value.animationSpeed}s
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
    }
    border-radius: ${objIcon.value.borderRadius}%; animation-duration: ${objIcon.value.animationSpeed}s
    `
}
  
  cssPropertiesString.value = cssProperties[objIcon.value.animation]
}

function openFileDialog(): void {
  fileInput.value?.click();
}

function handleFileChange(event: Event): void {
  const file = event?.target?.files[0];
  if (file) {
    convertToBase64(file);
  }
}

function convertToBase64(file: File): void {
  isLoadingFile.value = true;
  const reader = new FileReader();
  reader.onload = () => {
        const base64 = reader.result as string;

    // Monta o SVG com a imagem embutida
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <image href="${base64}" height="64" width="64"/>
      </svg>`
   objIcon.value.imageBase64 = base64
   objIcon.value.svgContent = svg
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

</script>

<style lang="sass" scoped>
.dropFile
  border: dashed
  border-color: darkgrey
  height: 90px

.border-section
  border: 1px solid lightgrey

  border-radius: 5px

</style>
