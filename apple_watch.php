<?php
include("security/main-blocker.php");
include('section_head.php');

$data = json_decode(file_get_contents("./json/applewatch.json"), true);
$total = count($data["tiles"] ?? []);

$modelos = $data['dictionaries']['dimensions']['refurbClearModel'] ?? [];
$colores = $data['dictionaries']['dimensions']['dimensionColor'] ?? [];
$capacidades = $data['dictionaries']['dimensions']['dimensionCapacity'] ?? [];
$conectividades = $data['dictionaries']['dimensions']['dimensionconnectivity'] ?? [];
?>

<div class="container" style="margin-top: 60px;">
    <h1>Compra tu Apple Watch ahora<br> y recibe en 9 días</h1>
</div>

<div class="container">
    <div class="product_grid">

        <?php
        function extractKey($dimension)
        {
            if (is_array($dimension)) {
                return $dimension[0] ?? '';
            }
            return $dimension;
        }

        for ($i = 0; $i < $total; $i++) {
            $item = $data['tiles'][$i];

            $titulo = str_replace("Refurbished ", "", $item['title'] ?? 'Sin título');
            $image = $item['image']['srcSet']['src'] ?? 'default.jpg';

            $precioRaw = (float) ($item['price']['currentPrice']['raw_amount'] ?? 0);
            $precioOriginalRaw = (float) ($item['price']['originalProductAmount'] ?? 0);
            $precioFinal = number_format(($precioRaw * 5.4) - 0.6, 2);
            $precioOriginal = number_format(($precioOriginalRaw * 5.4) - 0.6, 2);

            $modelKey = extractKey($item['filters']['dimensions']['refurbClearModel'] ?? '');
            $colorKey = extractKey($item['filters']['dimensions']['dimensionColor'] ?? '');
            $capacidadKey = extractKey($item['filters']['dimensions']['dimensionCapacity'] ?? '');
            $conectividadKey = extractKey($item['filters']['dimensions']['dimensionconnectivity'] ?? '');

            $modelo = $modelos[$modelKey]['text'] ?? 'Modelo desconocido';
            $color = $colores[$colorKey]['text'] ?? 'Color desconocido';
            $capacidad = $capacidades[$capacidadKey]['text'] ?? 'Capacidad desconocida';
            $conectividad = $conectividades[$conectividadKey]['text'] ?? 'Conectividad desconocida';

            echo "<div class='product-card $modelKey' data-product=\"" . htmlspecialchars($titulo) . "\">";
            echo "  <div class='product-image'>";
            echo "    <img src='$image' alt='$titulo'>";
            echo "  </div>";
            echo "  <div class='product-info'>";
            echo "    <h3 class='product-title'>$titulo</h3>";
            echo "    <div class='price-container'>";
            echo "      <span class='original-price'>S/ $precioOriginal</span>";
            echo "      <span class='final-price'>S/ $precioFinal</span>";
            echo "    </div>";
            echo "    <div class='specs-overlay'>";
            echo "      <div class='specs-item'><i class='fas fa-clock'></i> $modelo</div>";
            echo "      <div class='specs-item'><i class='fas fa-palette'></i> $color</div>";
            echo "      <div class='specs-item'><i class='fas fa-microchip'></i> $capacidad</div>";
            echo "      <div class='specs-item'><i class='fas fa-wifi'></i> $conectividad</div>";
            echo "    </div>";
            echo "  </div>";
            echo "</div>";
        }
        ?>

    </div>
</div>

<?php
include('section_footer.php');
?>