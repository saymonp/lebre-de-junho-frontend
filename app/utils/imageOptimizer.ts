interface OptimizationOptions {
  maxWidth?: number;      // Largura máxima da imagem final (padrão: 800px)
  quality?: number;       // Qualidade da compressão de 0 a 1 (padrão: 0.82)
  format?: 'image/webp' | 'image/jpeg'; // Formato de saída otimizado
}

/**
 * Recorta uma imagem na proporção 2:3, redimensiona e comprime para WebP/JPEG.
 */
export function optimizeImage(file: File, options: OptimizationOptions = {}): Promise<File> {
  const maxWidth = options.maxWidth || 800;
  const quality = options.quality || 0.82;
  const format = options.format || 'image/webp'; // WebP é excelente para web

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        // 1. Calcular as dimensões de corte para a proporção 2:3 (Aspect Ratio: 0.6666)
        const targetAspectRatio = 2 / 3;
        const currentAspectRatio = img.width / img.height;

        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = img.width;
        let sourceHeight = img.height;

        if (currentAspectRatio > targetAspectRatio) {
          // A imagem é muito larga (paisagem) -> Corta as laterais
          sourceWidth = img.height * targetAspectRatio;
          sourceX = (img.width - sourceWidth) / 2;
        } else if (currentAspectRatio < targetAspectRatio) {
          // A imagem é muito alta -> Corta o topo e o fundo
          sourceHeight = img.width / targetAspectRatio;
          sourceY = (img.height - sourceHeight) / 2;
        }

        // 2. Definir o tamanho final da imagem respeitando o maxWidth
        const finalWidth = Math.min(maxWidth, sourceWidth);
        const finalHeight = finalWidth / targetAspectRatio; // Sempre manterá 2:3 perfeito

        // 3. Desenhar no Canvas para aplicar as alterações de tamanho e corte
        const canvas = document.createElement('canvas');
        canvas.width = finalWidth;
        canvas.height = finalHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Não foi possível obter o contexto do Canvas.'));
        }

        // Ativa suavização de imagem de alta qualidade
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Desenha recortando o centro da imagem original e injetando no tamanho novo
        ctx.drawImage(
          img,
          sourceX, sourceY, sourceWidth, sourceHeight, // Onde cortar na imagem original
          0, 0, finalWidth, finalHeight                // Onde desenhar no canvas final
        );

        // 4. Transformar o canvas de volta em um arquivo binário comprimido (File)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('Falha ao processar o Blob da imagem.'));
            }

            // Define a extensão correta baseada no formato de saída escolhido
            const extension = format === 'image/webp' ? '.webp' : '.jpg';
            const cleanName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

            const optimizedFile = new File([blob], `${cleanName}${extension}`, {
              type: format,
              lastModified: Date.now(),
            });

            resolve(optimizedFile);
          },
          format,
          quality
        );
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
}