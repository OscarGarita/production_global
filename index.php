<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Production</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />


</head>

<body>

    <div class="container">
        <h1 class="title grid-max">Case Control</h1>

        <div class="links grid-max">

            <a href="https://apps.powerapps.com/play/e/default-9ac44c96-980a-481b-ae23-d8f56b82c605/a/cc479dee-23ce-48be-8dbd-1ede7ef392c7?tenantId=9ac44c96-980a-481b-ae23-d8f56b82c605&sourcetime=1725306617205"
                class="headings" target="_blank">Consultas <i class="fa-solid fa-caret-right"></i></a>

            <a href="https://bi-reports.aligntech.com/reports/powerbi/Incubator/Clinical%20Pilots/MES/PROA%20Dashabord"
                target="_blank">Proa <i class="fa-solid fa-caret-right"></i></a>

            <a href=" https://develop.aligntech.com/" target="_blank">Develop <i class="fa-solid fa-caret-right"></i></a>


            <a href="https://mynotes.aligntech.com/" target="_blank">My Notes <i class="fa-solid fa-caret-right"></i></a>

            <a href="https://wd5.myworkday.com/aligntech/d/home.htmld" target="_blank">Workday <i class="fa-solid fa-caret-right"></i></a>

            <a href="https://oms/#/home" target="_blank">OMS <i class="fa-solid fa-caret-right"></i></a>

        </div>


        <div class="container-button-one">
            <input type="number" class="pid" id="boxPid" name="pid" placeholder="PID:" required>

        </div>

        <div class="container-button-two grid-left">
            <!--<button class="button blue" id="btnRemove">Remove Previous</button>-->
            <button class="button blue" id="btnClean">Clean Table</button>

        </div>

        <div class="container-button-three grid-left grid-max " id="divBotones">
            <button class="button green" id="btnPrimary">Primary</button>
            <button class="button green" id="btnSecondary">Secondary</button>
            <button class="button green" id="btnCcmod">CCMod</button>
            <button class="button green" id="btnQc">QC</button>


            <div class="container-button-four">
                <button class="button green four" id="btnCbct">CBCT Primary</button>
                <button class="button green four" id="btnCbctSecondary">CBCT Secondary</button>
                <button class="button green four" id="btnCbctCcmod">CBCT CCMod</button>
            </div>


        </div>

        <div class="time-utilization grid-left" id="timeUtilization">
            <h2 class="time-u">
                Time utilization
            </h2>
            <div class="percentage">
                <p class="total" id="total">0%</p>
            </div>
        </div>

        <div class="completions grid-right">
            <h2>Completions</h2>
            <div class="packages"><span class="titles">Primary</span><span id="primaryCompletion">0</span></div>
            <div class="packages"><span class="titles">Secondary</span><span id="SecondaryCompletion">0</span></div>
            <div class="packages"><span class="titles">Ccmod</span><span id="ccmodCompletion">0</span></div>
            <div class="packages"><span class="titles">QC</span><span id="qcCompletion">0</span></div>
            <div>
                <span class="total-title">Total</span>
                <span class="green-total" id="totalCompletion">0</span>
            </div>
        </div>

        <div class="table-container  grid-max">

            <?php
            include 'conexion.php';
            include 'eliminar.php';
            ?>

            <table id="table">
                <thead>
                    <th>PID</th>
                    <th>TYPE</th>
                    <th>PERCENTAGE</th>
                    <th>DELETE</th>
                </thead>


                <?php

                $sql = $conexion->query(" SELECT *  FROM cases");

                while ($datos = $sql->fetch_object()) { ?>

                    <tr>
                        <td><?= $datos->pid ?></td>
                        <td><?= $datos->type ?></td>
                        <td><?= $datos->percentage ?></td>
                        <td><a href="index.php?pid=<?= $datos->pid ?>" class="btnEliminar"><i class="fa-solid fa-trash"></i></a></td>
                    </tr>

                <?php }
                ?>


            </table>

        </div>

</body>

<script src="/script/app.js"></script>


</html>