const container = document.getElementById('grid-container');
        const cols = 21;
        const rows = 12;
        let selectedColor = '#2196F3';

        // Create tiles
        for (let i = 0; i < cols * rows; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.addEventListener('click', function() {
                this.style.backgroundColor = selectedColor;
            });
            container.appendChild(tile);
        }

        // Color selection logic
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', function() {
                if (this.id !== 'custom-color') {
                    // Remove active class from all options
                    document.querySelectorAll('.color-option').forEach(opt => 
                        opt.classList.remove('active'));
                    // Set new color and add active class
                    selectedColor = this.dataset.color;
                    this.classList.add('active');
                }
            });
        });

        // Custom color picker handler
        document.getElementById('custom-color').addEventListener('input', function(e) {
            selectedColor = e.target.value;
            this.style.backgroundColor = selectedColor;
            // Remove active class from other options
            document.querySelectorAll('.color-option:not(#custom-color)').forEach(opt => 
                opt.classList.remove('active'));
        });