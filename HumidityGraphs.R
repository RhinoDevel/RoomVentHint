library(ggplot2)
library(RColorBrewer)
library(metR)

T_range <- seq(-10, 40, 0.1)
rh_range <- seq(0, 100, 0.1)
ah_range <- seq(0, 50, 0.1)

raster_color <- brewer.pal(11, 'PuOr')

# source: https://carnotcycle.wordpress.com/2012/08/04/how-to-convert-relative-humidity-to-absolute-humidity/
ah_func <- function(T, rh) {
  (6.112 * exp((17.67 * T) / (T + 243.5)) * rh * 2.1674) /  (273.15 + T)
}

ah_plot_data <- expand.grid(T = T_range, rh = rh_range)
ah_plot_data$ah <- ah_func(ah_plot_data$T, ah_plot_data$rh)

ah_breaks <- c(0, 1, 5, 10, 15, 20, 30, 40, 50)
ggplot(ah_plot_data, aes(
  x = T,
  y = rh,
  z = ah,
  fill = ah
)) +
  geom_raster(interpolate = TRUE) +
  scale_fill_gradientn(
    colors = raster_color,
    trans = "pseudo_log",
    breaks = ah_breaks,
    labels = ah_breaks
  ) +
  scale_x_continuous(expand = c(0, 0)) +
  scale_y_continuous(expand = c(0, 0)) +
  geom_contour(breaks = ah_breaks,
               colour = "black",
               size = 0.5) +
  geom_text_contour(
    breaks = ah_breaks,
    skip = 0,
    label.placer = label_placer_n(n = 3),
    stroke = 0.2,
    stroke.colour = "white"
  ) +
  theme_bw() +
  theme(panel.background = element_blank(), panel.ontop = TRUE) +
  labs(title = "Absolute Humidity in relation to Temperature and Relative Humidity", fill =
         "Absolute \nHumidity \n[g/m³]") +
  ylab("Relative Humidity [%]") +
  xlab("Temperature [°C]")

ggsave('ah_plot.png', width=20,height = 20, units='cm')

# reordered using https://www.wolframalpha.com/widgets/view.jsp?id=4be4308d0f9d17d1da68eea39de9b2ce
rh_func <- function(T, ah) {
  rh <-
    ah * exp(-(17.67 * T) / (T + 243.5)) * (0.0754879 * T + 20.6195)
  ifelse(rh > 100, NA, rh)
}

rh_plot_data <- expand.grid(T = T_range, ah = ah_range)
rh_plot_data$rh <- rh_func(rh_plot_data$T, rh_plot_data$ah)

rh_breaks <- c(0, 10, 30, 50, 70, 90, 100)
rh_plot <- ggplot(rh_plot_data, aes(
  x = T,
  y = ah,
  z = rh,
  fill = rh
))  +
  geom_raster(na.rm = TRUE, interpolate = TRUE) +
  scale_fill_gradientn(
    na.value = "transparent",
    colors = raster_color,
    breaks = rh_breaks,
    labels = rh_breaks,
    limits = c(0, 100)
  ) +
  scale_x_continuous(expand = c(0, 0)) +
  scale_y_continuous(expand = c(0, 0)) +
  geom_contour(
    na.rm = TRUE,
    breaks = rh_breaks,
    colour = "black",
    size = 0.5
  ) +
  geom_text_contour(
    na.rm = TRUE,
    breaks = rh_breaks,
    skip = 0,
    label.placer = label_placer_n(n = 3),
    stroke = 0.2,
    stroke.colour = "white",
    check_overlap = TRUE
  ) +
  theme_bw() +
  theme(panel.background = element_blank(), panel.ontop = TRUE) +
  labs(title = "Relative Humidity in relation to Temperature and Absolute Humidity", fill =
         "Relative \nHumidity \n[%]") +
  ylab("Absolute Humidity [g/m³]") +
  xlab("Temperature [°C]")

ggsave('rh_plot.png', width=20,height = 20, units='cm')
