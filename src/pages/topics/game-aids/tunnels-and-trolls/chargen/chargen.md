---
title: Tunnels & Trolls Character Generator
layout: base-layout.njk
permalink: /pages/topics/game-aids/tunnels-and-trolls/chargen/
is_app: True
breadcrumbs:
  - label: Home
    url: /
  - label: Topics
    url: /pages/topics/
  - label: Tunnels & Trolls
    url: /pages/topics/game-aids/tunnels-and-trolls/
  - label: Character Generator
tags:
  - Game Aids
  - TunnelsAndTrolls
---

<div class="app-desc">
<p>This is a simple character generator for the <a href="http://flyingbuffalo.com" target="_blank">Flying Buffalo</a> game Tunnels and Trolls.</p>
</div>

<div class="row-container">
    <div class="app-container">
        <div class="tnt">
            <h1>Tunnels & Trolls<br>Character Generator</h1>
        </div>
        <div class="divider"></div>
        <div class="form-panel">
            <h3>Character Data</h3>
            <!-- <form onsubmit="return false;"> -->
            <div class="form-controls">
                <label for="kindred">Kindred:</label>
                <select id="kindred" class="kindred" name="kindred" list="kindred-types">
                    <option value="Human">Human</option>
                    <option value="Dwarf (Gristlegrim)">Dwarf (Gristlegrim)</option>
                    <option value="Dwarf (Midgardian)">Dwarf (Midgardian)</option>
                    <option value="Elf">Elf</option>
                    <option value="Fairy">Fairy</option>
                    <option value="Hobb">Hobb</option>
                    <option value="Leprechaun">Leprechaun</option>
               </select>
            </div>
            <div class="form-controls">
                <label for="char-type">Type:</label>
                <select class="char-type" id="char-type" list="char-types" name="char-type">
                    <option value="Rogue">Rogue</option>
                    <option value="Warrior">Warrior</option>
                    <option value="Wizard">Wizard</option>
                </select>
            </div>
            <div class="form-controls">
                <label for="gender">Gender:</label>
                <select id="gender" class="gender" name="gender" list="genders">
                <datalist id="genders">
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="btn-div">
                <button id="generate" class="generate">Generate New Character</button>
            </div>
            <!-- </form> -->
        </div>
        <div class="divider"></div>
        <div class="stat-panel">
            <div class="stat-table">
                <h3>Character Stats</h3>
                <table id="char-stats"></table>
            </div>
            <div class="other-stats">
                <h3>Other Stats</h3>
                <table id="other-stats-table">
                </table>
            </div>
        </div>
    </div>
</div>
